import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Renderer from "./renderer";

// Map utils
import Cargo from "./cargo";
import LoadSpace from "./loadSpace";
import Arrangement from "./arrangement";

export class MapCargo {
  // Настройки
  #raycaster = new THREE.Raycaster();
  #isShiftDown = false;
  // #cubeGeo = null;
  // #cubeMaterial = null;
  // #rollOverMesh = null;
  // #rollOverMaterial = null;
  #objects = [];
  renderer;

  // Конфигурация холста
  #width = 0; // Ширина холста
  #height = 0; // Высота холста

  // Конфигурация сетки
  #gridSize = 200; // размер
  #gridSizeCell = 50; // размер ячейки
  #gridColorLine = "#f00"; // цвет осей
  #gridColorCell = "#bbb"; // цвет ячейки

  // Конфигурация объектов
  #planeSize = this.#gridSize; // размер поля
  #boxSize = this.#gridSize / this.#gridSizeCell; //  размер блока

  constructor(params) {
    this.#width = params.width;
    this.#height = params.height;

    this.handleRender = this.render.bind(this);

    // Камера
    this.cameraX = 30;
    this.cameraY = 30;
    this.cameraZ = 30;
  }

  editor() {
    window.removeEventListener("pointermove", this.handleRender);

    // Подсветка блока
    this.rollOverGeo = new THREE.BoxGeometry(this.#boxSize, this.#boxSize, this.#boxSize);
    this.rollOverMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      opacity: 0.5,
      transparent: true,
    });
    this.rollOverMesh = new THREE.Mesh(this.rollOverGeo, this.rollOverMaterial);
    this.scene.add(this.rollOverMesh);

    window.addEventListener("pointermove", (e) => this.onPointerMove(e));
    window.addEventListener("dblclick", (e) => this.onPointerDown(e));
  }

  init(space, cargos) {
    // Список грузовых групп
    this.groups = [];

    // Создаем грузы
    cargos.forEach((cargo, id) => {
      // Создаем для каждой группы блоков отдельную группу
      this.groups.push(new THREE.Group());
      this.groups[id].name = `cargo-group-${id}`;

      for (let i = 0; i < cargo.count; i++) {
        // Создаем груз
        const block = new Cargo(cargo, id, this.groups[id].name);

        // Добавляем в глобальный массив
        this.#objects.push(block.get);

        // Деструктурируем блок, тк группы ругаются на объекты
        const { block: gBlock, line: gLine, label: gLabel } = block.get;

        // Добавляем в группу, текущие блоки
        this.groups[id].add(gBlock);
        this.groups[id].add(gLine);
        this.groups[id].add(gLabel);
      }
    });

    const settings = {
      scene: this.scene,
      space,
      groups: this.groups,
      cargos: this.#objects,
    };

    const arrange = new Arrangement(settings);
    arrange.start();

    // После расстановки добавить все группы на сцену
    this.groups.forEach((group) => this.scene.add(group));
  }

  create() {
    // Создание сцены
    this.scene = new THREE.Scene();

    // Создание камеры
    this.camera = new THREE.PerspectiveCamera(75, this.#width / this.#height, 0.1, 1000);

    // Создание сетки
    this.grid = new THREE.GridHelper(
      this.#gridSize,
      this.#gridSizeCell,
      this.#gridColorLine,
      this.#gridColorCell
    );
    this.scene.add(this.grid);

    this.canvas = document.querySelector("#canvas");

    this.renderer = new Renderer({
      canvas: this.canvas,
      width: this.#width,
      height: this.#height,
    }).renderer;
    this.pointer = new THREE.Vector2();

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = false;
    this.controls.enableZoom = true;
    this.controls.enablePan = true;
    this.controls.minDistance = 20;
    this.controls.maxDistance = 200;

    this.camera.position.set(this.cameraX, this.cameraY, this.cameraZ);

    this.geometry = new THREE.PlaneGeometry(this.#planeSize, this.#planeSize);
    this.geometry.rotateX(-Math.PI / 2);

    this.plane = new THREE.Mesh(this.geometry, new THREE.MeshBasicMaterial({ visible: false }));
    this.plane.name = "platform";
    this.scene.add(this.plane);

    this.#objects.push(this.plane);

    this.controls.update();

    window.addEventListener("pointermove", this.handleRender);
    window.addEventListener("wheel", () => this.onScroll());
    window.requestAnimationFrame(() => this.render());
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onScroll() {
    this.render();
  }

  onPointerMove(event) {
    this.pointer.set(
      (event.clientX / this.#width) * 2 - 1,
      -((event.clientY - 64) / this.#height) * 2 + 1
    );

    this.#raycaster.setFromCamera(this.pointer, this.camera);

    this.intersects = this.#raycaster.intersectObjects(this.#objects, false);

    if (this.intersects.length > 0) {
      this.intersect = this.intersects[0];

      this.rollOverMesh.position.copy(this.intersect.point).add(this.intersect.face.normal);
      this.rollOverMesh.position
        .divideScalar(this.#boxSize)
        .floor()
        .multiplyScalar(this.#boxSize)
        .addScalar(this.#boxSize / 2);

      this.render();
    }
  }

  onPointerDown(event) {
    this.pointer.set(
      (event.clientX / this.#width) * 2 - 1,
      -((event.clientY - 64) / this.#height) * 2 + 1
    );

    this.#raycaster.setFromCamera(this.pointer, this.camera);

    this.intersects = this.#raycaster.intersectObjects(this.#objects, false);

    if (this.intersects.length > 0) {
      this.intersect = this.intersects[0];

      if (this.#isShiftDown) {
        if (this.intersect.object !== this.plane) {
          this.scene.remove(this.intersect.object);

          this.#objects.splice(this.#objects.indexOf(this.intersect.object), 1);
        }

        // create cube
      } else {
        const properties = {
          cargo: {
            size: {
              x: this.#boxSize,
              y: this.#boxSize,
              z: this.#boxSize,
            },
          },
          scene: this.scene,
        };

        const block = new Cargo(properties);
        block.create(this.intersect);
        this.#objects.push(block.get);
      }

      this.render();
    }
  }
}

// let pointer = new THREE.Vector2(),
//   raycaster,
//   isShiftDown = false;
// let plane;
// let cubeGeo, cubeMaterial;
// let objects = [];
// let rollOverMesh, rollOverMaterial;
// let colorBlock = 0;
// let camera;

// export const setColorBlock = (color) => {
//   colorBlock = color;
// };

// // Конфиг
// const gridSize = 200; // размер сетки
// const gridSizeCell = 50; // размер ячейки сетки
// const planeSize = 200; // размер поля
// const boxSize = gridSize / gridSizeCell; // размер блока

// export const init = (settings) => {
//   settings = settings;
//   // Создание сцены
//   const scene = new THREE.Scene();
//   // Создание камеры
//   camera = new THREE.PerspectiveCamera(75, settings.width / settings.height, 0.1, 1000);
//   // Создание сетки
//   const grid = new THREE.GridHelper(gridSize, gridSizeCell, "red", "#bbb");
//   scene.add(grid);

//   // Рендер
//   const canvas = document.querySelector("#canvas");
//   const renderer = new THREE.WebGLRenderer({
//     antialias: true,
//     canvas,
//   });

//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.setSize(settings.width, settings.height);
//   renderer.setClearColor("#fff", 1);

//   const controls = new OrbitControls(camera, renderer.domElement);
//   controls.enableDamping = false;
//   controls.enableZoom = true;
//   controls.enablePan = true;
//   controls.minDistance = 20;
//   controls.maxDistance = 200;

//   raycaster = new THREE.Raycaster();

//   const geometry = new THREE.PlaneGeometry(planeSize, planeSize);
//   geometry.rotateX(-Math.PI / 2);

//   plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }));
//   scene.add(plane);

//   objects.push(plane);

//   // roll-over helpers
//   const rollOverGeo = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
//   rollOverMaterial = new THREE.MeshBasicMaterial({
//     color: 0xff0000,
//     opacity: 0.5,
//     transparent: true,
//   });
//   rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
//   scene.add(rollOverMesh);

//   camera.position.set(20, 50, 40);
//   controls.update();

//   const render = () => {
//     renderer.render(scene, camera);
//   };

//   function onScroll(event) {
//     render();
//   }
//   //
//   function onPointerMove(event) {
//     pointer.set((event.clientX / settings.width) * 2 - 1, -((event.clientY - 64) / settings.height) * 2 + 1);

//     raycaster.setFromCamera(pointer, camera);

//     const intersects = raycaster.intersectObjects(objects, false);

//     if (intersects.length > 0) {
//       const intersect = intersects[0];

//       rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
//       rollOverMesh.position
//         .divideScalar(boxSize)
//         .floor()
//         .multiplyScalar(boxSize)
//         .addScalar(boxSize / 2);

//       render();
//     }
//   }
//   //

//   const onKeyUp = (e) => {
//     switch (e.key) {
//       case "c":
//         console.log(objects);
//         objects = [];
//         render();
//         break;

//       default:
//         render();
//     }
//   };

//   function onPointerDown(event) {
//     pointer.set((event.clientX / settings.width) * 2 - 1, -((event.clientY - 64) / settings.height) * 2 + 1);

//     raycaster.setFromCamera(pointer, camera);

//     const intersects = raycaster.intersectObjects(objects, false);

//     if (intersects.length > 0) {
//       const intersect = intersects[0];

//       if (isShiftDown) {
//         if (intersect.object !== plane) {
//           scene.remove(intersect.object);

//           objects.splice(objects.indexOf(intersect.object), 1);
//         }

//         // create cube
//       } else {
//         const colors = ["rgb(20, 100, 120)", "yellow", "lime"];
//         cubeGeo = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
//         cubeMaterial = new THREE.MeshBasicMaterial({
//           color: colors[0],
//           opacity: 0.6,
//           transparent: true,
//         });
//         const voxel = new THREE.Mesh(cubeGeo, cubeMaterial);

//         // voxel.material.color.set(colors[Math.floor(Math.random() * 5)])
//         // console.log(voxel.setColorAt)
//         voxel.position.copy(intersect.point).add(intersect.face.normal);
//         voxel.position
//           .divideScalar(boxSize)
//           .floor()
//           .multiplyScalar(boxSize)
//           .addScalar(boxSize / 2);
//         scene.add(voxel);

//         const edges2 = new THREE.EdgesGeometry(new THREE.BoxGeometry(boxSize, boxSize, boxSize));
//         const line2 = new THREE.LineSegments(
//           edges2,
//           new THREE.LineBasicMaterial({
//             color: "black",
//           })
//         );
//         line2.position.copy(intersect.point).add(intersect.face.normal);
//         line2.position
//           .divideScalar(boxSize)
//           .floor()
//           .multiplyScalar(boxSize)
//           .addScalar(boxSize / 2);
//         scene.add(line2);

//         objects.push(voxel);
//         console.log(objects);
//       }

//       render();
//     }
//   }

//   window.addEventListener("dblclick", onPointerDown);
//   window.addEventListener("pointermove", onPointerMove);
//   window.addEventListener("wheel", onScroll);
//   window.addEventListener("keyup", onKeyUp);

//   window.requestAnimationFrame(render);
// };

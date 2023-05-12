import * as THREE from "three";

export default class Cargo {
  constructor({ name, width, height, length, color, turn }, id, group) {
    // this.group = groupCargo;
    // Сцена холста
    // this.scene = scene;

    // // Грузовое пространство
    // this.space = space;
    // this.spaceMaxY = this.space.position.faceY.max;
    // this.spaceMinX = this.space.position.faceX.min;
    // this.spaceMaxX = this.space.position.faceX.max;
    // this.spaceMinZ = this.space.position.faceZ.min;
    // this.spaceMaxZ = this.space.position.faceZ.max;

    // // Размеры груза
    // this.width = width;
    // this.height = height;
    // this.length = length;

    // // Цвет груза
    // this.color = color;

    // Имя груза
    this.name = name;

    // Поворот груза
    this.rotate = turn;

    // Группа
    this.group = group;

    const labelGeometry = new THREE.PlaneGeometry(
      length > width ? width * 0.7 : length * 0.7,
      length > width ? width * 0.7 : length * 0.7
    );
    labelGeometry.rotateX(-Math.PI / 2);
    labelGeometry.rotateY(Math.PI / 2);
    labelGeometry.translate(0, height / 2 + 0.001, 0);

    const canvas = this.makeLabelCanvas(82, id + 1);
    const texture = new THREE.CanvasTexture(canvas);

    texture.minFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    const labelMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
    });

    this.geometry = new THREE.BoxGeometry(width, height, length);
    this.material = new THREE.MeshBasicMaterial({
      color: color,
      opacity: 0.6,
      transparent: true,
    });

    this.edges = new THREE.EdgesGeometry(this.geometry);
    this.line = new THREE.LineSegments(
      this.edges,
      new THREE.LineBasicMaterial({
        color: "black",
      })
    );

    // Создать фигуру
    this.block = new THREE.Mesh(this.geometry, this.material);
    this.label = new THREE.Mesh(labelGeometry, labelMaterial);

    // Имя фигуры
    this.block.name = this.name;
    this.line.name = this.name;
    this.label.name = this.name;

    // Ставим блок на платформу [!возможен баг]
    // this.block.position.y = this.height / 2;
    // this.line.position.y = this.height / 2;
  }

  // Проверка на пересечение блоков
  // isCollision(object) {
  //   const currentBlock = new THREE.Box3().setFromObject(this.block);
  //   const otherBlock = new THREE.Box3().setFromObject(object);
  //   return currentBlock.intersectsBox(otherBlock);
  // }

  // Проверка пересечения контейнера по оси +Y
  // isOutwardsY() {
  //   const positionY =
  //     Number.parseFloat(this.height / 2) + Number.parseFloat(this.block.position.y.toFixed(2));
  //   return positionY > this.spaceMaxY ? true : false;
  // }

  // Проверка пересечения контейнера по оси +Z
  // isOutwardsMaxZ() {
  //   const positionZ = this.block.position.z + this.length / 2;
  //   if (positionZ > this.spaceMaxZ) {
  //     return true;
  //   }
  //   return false;
  // }

  // Проверка пересечения контейнера по оси +X
  // isOutwardsMaxX() {
  //   const positionX = this.block.position.x + this.width / 2;
  //   if (positionX > this.spaceMaxX) {
  //     return true;
  //   }
  //   return false;
  // }
  // Проверка пересечения контейнера по оси -X
  // isOutwardsMinX() {
  //   const positionX = this.block.position.x + this.width / 2;
  //   if (positionX < this.spaceMinX) {
  //     return true;
  //   }
  //   return false;
  // }

  // setPosition(position, axis) {
  //   if (axis === "x") {
  //     this.block.position.x = position;
  //     this.line.position.x = position;
  //   } else if (axis === "+x") {
  //     this.block.position.x += position;
  //     this.line.position.x += position;
  //   } else if (axis === "-x") {
  //     this.block.position.x -= position;
  //     this.line.position.x -= position;
  //   } else if (axis === "y") {
  //     this.block.position.y = position;
  //     this.line.position.y = position;
  //   } else if (axis === "+y") {
  //     this.block.position.y += position;
  //     this.line.position.y += position;
  //   } else if (axis === "-y") {
  //     this.block.position.y -= position;
  //     this.line.position.y -= position;
  //   } else if (axis === "z") {
  //     this.block.position.z = position;
  //     this.line.position.z = position;
  //   } else if (axis === "+z") {
  //     this.block.position.z += position;
  //     this.line.position.z += position;
  //   } else if (axis === "-z") {
  //     this.block.position.z -= position;
  //     this.line.position.z -= position;
  //   }
  // }

  // Тестовый список алгоритмов

  // сдвиг по осям если есть коллизия
  // offset(blocks, direction) {
  //   for (let j = 0; j < blocks.length; j++) {
  //     while (this.isCollision(blocks[j])) {
  //       this.setPosition(0.1, direction);
  //     }
  //   }
  // }

  // isCollisionAll(objects) {
  //   const currentBlock = new THREE.Box3().setFromObject(this.block);
  //   for (let i = 0; i < objects.length; i++) {
  //     const otherBlock = new THREE.Box3().setFromObject(objects[i]);
  //     if (currentBlock.intersectsBox(otherBlock)) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // swap(blocks, name) {
  //   return [
  //     ...blocks.filter((block) => block.name === name),
  //     ...blocks.filter((block) => block.name !== name),
  //   ];
  // }

  // Алгоритм расстановки грузов
  // arrange(objects) {
  //   // Получаем блоки
  //   let blocks = objects.filter((object) => object.geometry.type !== "PlaneGeometry");

  //   for (let i = 0; i < blocks.length; ) {
  //     // Получаем последний блок
  //     const lastBlock = blocks[blocks.length - 1];

  //     // Запоминаем координаты последнего блока по x
  //     if (lastBlock.geometry.parameters.width === this.width) {
  //       this.setPosition(lastBlock.position.x, "x");
  //     } else {
  //       this.setPosition(
  //         lastBlock.position.x - lastBlock.geometry.parameters.width / 2 + this.width / 2,
  //         "x"
  //       );
  //     }
  //     // Запоминаем координаты последнего блока по z
  //     this.setPosition(lastBlock.position.z, "z");

  //     // Запоминаем координаты последнего блока по y
  //     if (lastBlock == this.height) {
  //       this.setPosition(lastBlock.position.y, "y");
  //     } else {
  //       this.setPosition(this.height / 2, "y");
  //     }

  //     // Проверка не вышел ли за пределы z
  //     if (!this.isOutwardsMaxZ() && !this.isOutwardsMinX()) {
  //       // Сдвиг вниз
  //       this.offset(blocks, "+z");

  //       if (this.isCollisionAll(blocks)) {
  //         blocks = this.swap(blocks, this.block.name);
  //         this.block.position.set(
  //           this.spaceMinX + this.width / 2,
  //           this.height / 2,
  //           this.spaceMinZ + this.length / 2
  //         );
  //         this.line.position.set(
  //           this.spaceMinX + this.width / 2,
  //           this.height / 2,
  //           this.spaceMinZ + this.length / 2
  //         );
  //       }

  //       // Заново проверка и если по сдвигу вниз была коллизия, сдвигаем вправо
  //     }

  //     // Проверка вышел ли за пределы z
  //     if (this.isOutwardsMaxZ()) {
  //       this.setPosition(this.spaceMinZ + this.length / 2, "z");
  //       let buff = 0;
  //       for (let j = 0; j < blocks.length; j++) {
  //         while (this.isCollision(blocks[j])) {
  //           if (buff.toFixed(1) > this.width) {
  //             break;
  //           }

  //           this.setPosition(0.1, "+x");
  //           buff += 0.1;
  //         }
  //       }
  //     }

  //     // Проверка вышел ли за пределы x
  //     if (this.isOutwardsMaxX()) {
  //       this.setPosition(this.height + 0.01, "+y");
  //       this.setPosition(this.spaceMinX + this.width / 2, "x");
  //     }

  //     // if (!this.isOutwardsY()) {
  //     //   while (this.isCollision(newObjects[i])) {
  //     //     this.block.position.y +=
  //     //       parseInt(newObjects[i].geometry.parameters.height / this.block.position.y) + 0.01;
  //     //     this.line.position.y +=
  //     //       parseInt(newObjects[i].geometry.parameters.height / this.line.position.y) + 0.01;
  //     //   }
  //     // }

  //     // if (this.isOutwardsY()) {
  //     //   this.block.position.y = this.height / 2;
  //     //   this.line.position.y = this.height / 2;

  //     //   for (let j = 0; j < newObjects.length; j++) {
  //     //     while (this.isCollision(newObjects[j])) {
  //     //       this.block.position.x += 0.1;
  //     //       this.line.position.x += 0.1;
  //     //     }
  //     //   }
  //     // }
  //     i++;
  //   }

  //   if (blocks.length === 0) {
  //     this.block.position.set(
  //       this.spaceMinX + this.width / 2,
  //       this.height / 2,
  //       this.spaceMinZ + this.length / 2
  //     );
  //     this.line.position.set(
  //       this.spaceMinX + this.width / 2,
  //       this.height / 2,
  //       this.spaceMinZ + this.length / 2
  //     );
  //   }
  //   // this.scene.add(this.block, this.line);
  //   this.group.add(this.block, this.line);
  // }

  // create(intersect) {
  //   this.block.position.copy(intersect.point).add(intersect.face.normal);
  //   this.block.position
  //     .divideScalar(this.width)
  //     .floor()
  //     .multiplyScalar(this.width)
  //     .addScalar(this.width / 2);

  //   this.scene.add(this.block);

  //   this.edges2 = new THREE.EdgesGeometry(
  //     new THREE.BoxGeometry(this.width, this.height, this.length)
  //   );
  //   this.line = new THREE.LineSegments(
  //     this.edges2,
  //     new THREE.LineBasicMaterial({
  //       color: "black",
  //     })
  //   );

  //   this.line.position.copy(intersect.point).add(intersect.face.normal);
  //   this.line.position
  //     .divideScalar(this.width)
  //     .floor()
  //     .multiplyScalar(this.width)
  //     .addScalar(this.width / 2);

  //   this.scene.add(this.line);
  // }

  get get() {
    return { block: this.block, line: this.line, label: this.label, parameters: this.parameters };
  }

  get parameters() {
    return {
      width: this.block.geometry.parameters.width,
      height: this.block.geometry.parameters.height,
      length: this.block.geometry.parameters.depth,
      rotated: false,
      rotate: this.rotate,
      group: this.group,
    };
  }

  makeLabelCanvas(size, name) {
    const borderSize = 2;
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.font = `70px Consolas`;
    ctx.textBaseline = "top";
    ctx.fillStyle = "black";
    ctx.fillText(name, borderSize, borderSize);

    return ctx.canvas;
  }
}

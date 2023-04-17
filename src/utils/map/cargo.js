import * as THREE from "three";

export default class Cargo {
  constructor(scene, { name, width, height, length, color }) {
    // Сцена холста
    this.scene = scene;

    // Размеры груза
    this.width = width;
    this.height = height;
    this.length = length;

    // Цвет груза
    this.color = color;

    // Имя груза
    this.name = name;

    this.geometry = new THREE.BoxGeometry(this.width, this.height, this.length);
    this.material = new THREE.MeshBasicMaterial({
      color: this.color,
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

    // Имя фигуры
    this.block.name = this.name;

    // Ставим блок на платформу [!возможен баг]
    this.block.position.y = this.height / 2;
    this.line.position.y = this.height / 2;
  }

  // Проверка на пересечение блоков
  isCollision(object) {
    const currentBlock = new THREE.Box3().setFromObject(this.block);
    const otherBlock = new THREE.Box3().setFromObject(object);
    return currentBlock.intersectsBox(otherBlock);
  }

  // console.log("Позиция Y: ", positionY);
  // console.log("Размер коробки: ", this.height.toFixed(2));
  // console.log("----------------------------------");

  isOutwardsY() {
    const positionY =
      Number.parseFloat(this.height / 2) + Number.parseFloat(this.block.position.y.toFixed(2));

    if (positionY > this.spaceHeight) {
      return true;
    }
    return false;
  }

  // Алгоритм расстановки грузов
  arrange(objects, space) {
    const newObjects = objects.filter((object) => object.geometry.type !== "PlaneGeometry");
    this.spaceHeight = space.geometry.parameters.height;

    for (let i = 0; i < newObjects.length; ) {
      this.block.position.x = newObjects[newObjects.length - 1].position.x;
      this.line.position.x = newObjects[newObjects.length - 1].position.x;

      if (!this.isOutwardsY()) {
        while (this.isCollision(newObjects[i])) {
          this.block.position.y +=
            parseInt(newObjects[i].geometry.parameters.height / this.block.position.y) + 0.01;
          this.line.position.y +=
            parseInt(newObjects[i].geometry.parameters.height / this.line.position.y) + 0.01;
        }
      }

      if (this.isOutwardsY()) {
        this.block.position.y = this.height / 2;
        this.line.position.y = this.height / 2;

        for (let j = 0; j < newObjects.length; j++) {
          while (this.isCollision(newObjects[j])) {
            this.block.position.x += 0.1;
            this.line.position.x += 0.1;
          }
        }
      }

      i++;
    }

    this.scene.add(this.block, this.line);
  }

  create(intersect) {
    this.block.position.copy(intersect.point).add(intersect.face.normal);
    this.block.position
      .divideScalar(this.width)
      .floor()
      .multiplyScalar(this.width)
      .addScalar(this.width / 2);

    this.scene.add(this.block);

    this.edges2 = new THREE.EdgesGeometry(
      new THREE.BoxGeometry(this.width, this.height, this.length)
    );
    this.line = new THREE.LineSegments(
      this.edges2,
      new THREE.LineBasicMaterial({
        color: "black",
      })
    );

    this.line.position.copy(intersect.point).add(intersect.face.normal);
    this.line.position
      .divideScalar(this.width)
      .floor()
      .multiplyScalar(this.width)
      .addScalar(this.width / 2);

    this.scene.add(this.line);
  }

  get get() {
    return this.block;
  }
}

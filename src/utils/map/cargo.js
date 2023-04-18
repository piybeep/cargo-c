import * as THREE from "three";

export default class Cargo {
  constructor(scene, space, { name, width, height, length, color }) {
    // Сцена холста
    this.scene = scene;

    // Грузовое пространство
    this.space = space;
    this.spaceMaxY = this.space.position.faceY.max;
    this.spaceMinX = this.space.position.faceX.min;
    this.spaceMaxX = this.space.position.faceX.max;
    this.spaceMinZ = this.space.position.faceZ.min;
    this.spaceMaxZ = this.space.position.faceZ.max;

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

  isOutwardsY() {
    const positionY =
      Number.parseFloat(this.height / 2) + Number.parseFloat(this.block.position.y.toFixed(2));
    return positionY > this.spaceMaxY ? true : false;
  }

  isOutwardsMaxZ() {
    const positionZ = this.block.position.z + this.length / 2;
    if (positionZ > this.spaceMaxZ) {
      return true;
    }
    return false;
  }

  isOutwardsMaxX() {
    const positionX = this.block.position.x + this.width / 2;
    if (positionX > this.spaceMaxX) {
      return true;
    }
    return false;
  }

  // Алгоритм расстановки грузов
  arrange(objects) {
    const newObjects = objects.filter((object) => object.geometry.type !== "PlaneGeometry");

    for (let i = 0; i < newObjects.length; ) {
      if (newObjects[newObjects.length - 1].geometry.parameters.width == this.width) {
        this.block.position.x = newObjects[newObjects.length - 1].position.x;
        this.line.position.x = newObjects[newObjects.length - 1].position.x;
      } else {
        this.block.position.x =
          newObjects[newObjects.length - 1].position.x -
          newObjects[newObjects.length - 1].geometry.parameters.width / 2 +
          this.width / 2;
        this.line.position.x =
          newObjects[newObjects.length - 1].position.x -
          newObjects[newObjects.length - 1].geometry.parameters.width / 2 +
          this.width / 2;
      }

      this.block.position.z = newObjects[newObjects.length - 1].position.z;
      this.line.position.z = newObjects[newObjects.length - 1].position.z;

      if (newObjects[newObjects.length - 1].geometry.parameters.height == this.height) {
        this.block.position.y = newObjects[newObjects.length - 1].position.y;
        this.line.position.y = newObjects[newObjects.length - 1].position.y;
      } else {
        this.block.position.y = this.height / 2;
        this.line.position.y = this.height / 2;
      }

      if (!this.isOutwardsMaxZ()) {
        while (this.isCollision(newObjects[i])) {
          this.block.position.z += 0.1;
          this.line.position.z += 0.1;
        }
      }

      if (this.isOutwardsMaxZ()) {
        this.block.position.x = this.spaceMinX + this.width / 2 - this.width;
        this.block.position.z = this.spaceMinZ + this.length / 2;

        this.line.position.x = this.spaceMinX + this.width / 2 - this.width;
        this.line.position.z = this.spaceMinZ + this.length / 2;

        for (let j = 0; j < newObjects.length; j++) {
          while (this.isCollision(newObjects[j])) {
            this.block.position.x += 0.1;
            this.line.position.x += 0.1;
          }
        }
      }

      if (this.isOutwardsMaxX()) {
        this.block.position.y += this.height + 0.01;
        this.line.position.y += this.height + 0.01;
        this.block.position.x = this.spaceMinX + this.width / 2;
        this.line.position.x = this.spaceMinX + this.width / 2;
      }

      // if (!this.isOutwardsY()) {
      //   while (this.isCollision(newObjects[i])) {
      //     this.block.position.y +=
      //       parseInt(newObjects[i].geometry.parameters.height / this.block.position.y) + 0.01;
      //     this.line.position.y +=
      //       parseInt(newObjects[i].geometry.parameters.height / this.line.position.y) + 0.01;
      //   }
      // }

      // if (this.isOutwardsY()) {
      //   this.block.position.y = this.height / 2;
      //   this.line.position.y = this.height / 2;

      //   for (let j = 0; j < newObjects.length; j++) {
      //     while (this.isCollision(newObjects[j])) {
      //       this.block.position.x += 0.1;
      //       this.line.position.x += 0.1;
      //     }
      //   }
      // }

      i++;
    }
    if (newObjects.length === 0) {
      this.block.position.set(
        this.spaceMinX + this.width / 2,
        this.height / 2,
        this.spaceMinZ + this.length / 2
      );
      this.line.position.set(
        this.spaceMinX + this.width / 2,
        this.height / 2,
        this.spaceMinZ + this.length / 2
      );
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

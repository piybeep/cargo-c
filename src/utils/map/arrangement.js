import * as THREE from "three";

export default class Arrangement {
  constructor({ scene, space, groups, cargos }) {
    // Сцена
    this.scene = scene;

    // Грузовое пространство
    this.space = space;
    this.spaceMinX = this.space.position.faceX.min;
    this.spaceMaxX = this.space.position.faceX.max;
    this.spaceMaxY = this.space.position.faceY.max;
    this.spaceMinZ = this.space.position.faceZ.min;
    this.spaceMaxZ = this.space.position.faceZ.max;

    // Группы грузов
    this.groups = groups;

    // Грузы
    this.cargos = cargos.filter((cargo) => cargo.name !== "platform");
  }

  // Расстановки блоков
  start() {
    for (let i = 0; i < this.cargos.length; i++) {
      // Стартовая позиция
      if (i === 0) {
        this.startPosition(this.cargos[i]);
        continue;
      }

      // Получаем позицию предыдущего блока
      const previous = this.cargos[i - 1];

      // Ставим следующий блок, относительно предыдущего X
      if (previous.parameters.width === this.cargos[i].parameters.width) {
        this.setPosition(this.cargos[i], previous.block.position.x, "x");
      } else {
        this.setPosition(
          this.cargos[i],
          previous.block.position.x -
            previous.parameters.width / 2 +
            this.cargos[i].parameters.width / 2,
          "x"
        );
      }

      // Ставим следующий блок, относительно предыдущего Z
      this.setPosition(this.cargos[i], previous.block.position.z, "z");

      // Ставим следующий блок, относительно предыдущего Y
      if (previous.parameters.height == this.cargos[i].parameters.height) {
        this.setPosition(this.cargos[i], previous.block.position.y, "y");
      } else {
        this.setPosition(this.cargos[i], previous.parameters.height / 2 / 2, "y");
      }

      if (!this.isOutwardsMaxZ(this.cargos[i])) this.offset(this.cargos[i], "+z");

      if (this.isOutwardsMaxZ(this.cargos[i])) {
        this.setPosition(this.cargos[i], this.spaceMinZ + this.cargos[i].parameters.length / 2, "z");
      }
    }
  }

  // Помощники
  isCollision(cargo) {
    const currentCargo = new THREE.Box3().setFromObject(cargo.block);

    for (let i = 0; i < this.cargos.length; i++) {
      // Если тот же самый груз, пропускаем итерацию
      if (cargo.block.uuid === this.cargos[i].block.uuid) continue;

      const otherCargo = new THREE.Box3().setFromObject(this.cargos[i].block);

      if (currentCargo.intersectsBox(otherCargo)) return true;
    }

    return false;
  }

  setPosition(cargo, position, axis) {
    if (axis === "x") {
      cargo.block.position.x = position;
      cargo.line.position.x = position;
    } else if (axis === "+x") {
      cargo.block.position.x += position;
      cargo.line.position.x += position;
    } else if (axis === "-x") {
      cargo.block.position.x -= position;
      cargo.line.position.x -= position;
    } else if (axis === "y") {
      cargo.block.position.y = position;
      cargo.line.position.y = position;
    } else if (axis === "+y") {
      cargo.block.position.y += position;
      cargo.line.position.y += position;
    } else if (axis === "-y") {
      cargo.block.position.y -= position;
      cargo.line.position.y -= position;
    } else if (axis === "z") {
      cargo.block.position.z = position;
      cargo.line.position.z = position;
    } else if (axis === "+z") {
      cargo.block.position.z += position;
      cargo.line.position.z += position;
    } else if (axis === "-z") {
      cargo.block.position.z -= position;
      cargo.line.position.z -= position;
    } else {
      cargo.block.position.y -= position;
      cargo.line.position.y -= position;
    }
  }

  // Установить стартовую позицию внутри контейнера
  startPosition(cargo) {
    this.setPosition(cargo, this.spaceMinX + cargo.parameters.width / 2, "x");
    this.setPosition(cargo, cargo.parameters.height / 2, "y");
    this.setPosition(cargo, this.spaceMinZ + cargo.parameters.length / 2, "z");
  }

  // Сдвиг с проверкой на коллизию
  offset(cargo, direction) {
    for (let i = 0; i < this.cargos.length; i++) {
      while (this.isCollision(cargo)) {
        this.setPosition(cargo, 0.1, direction);
      }
    }
  }

  // Проверка пересечения контейнера по оси +Z
  isOutwardsMaxZ(cargo) {
    return cargo.block.position.z + cargo.parameters.length / 2 > this.spaceMaxZ ? true : false;
  }
}

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
      if (i === 0) {
        this.setPosition(this.cargos[i], this.spaceMinX + this.cargos[i].parameters.width / 2, "x");
        this.setPosition(this.cargos[i], this.cargos[i].parameters.height / 2, "y");
        this.setPosition(this.cargos[i], this.spaceMinZ + this.cargos[i].parameters.length / 2, "z");
      }

      this.offset(this.cargos[i], "+x");
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

  offset(cargo, direction) {
    for (let i = 0; i < this.cargos.length; i++) {
      while (this.isCollision(cargo)) {
        this.setPosition(cargo, 0.1, direction);
      }
    }
  }
}

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
    this.countSpace = 0;

    // Группы грузов
    this.groups = groups;

    // Грузы
    this.cargos = cargos.filter((cargo) => cargo.name !== "platform");
  }

  // Расстановки блоков
  start() {
    // this.isSwap = false;

    // Ярус
    this.isTier = false;

    // Ставим все блоки за карту, чтобы не мешала расстановке
    this.defaultPosition();

    for (let i = 0; i < this.cargos.length; i++) {
      // Стартовая позиция
      if (i === 0) {
        this.startPosition(this.cargos[i]);
        continue;
      }
      // Получаем позицию предыдущего блока
      this.previous = this.cargos[i - 1];

      // Ставим следующий блок, относительно предыдущего
      if (
        this.previous.parameters.length === this.cargos[i].parameters.length &&
        this.previous.parameters.width === this.cargos[i].parameters.width &&
        this.previous.parameters.height === this.cargos[i].parameters.height
      ) {
        this.setPosition(this.cargos[i], this.previous.block.position.z, "z");
        this.setPosition(this.cargos[i], this.previous.block.position.x, "x");
        this.setPosition(this.cargos[i], this.previous.block.position.y, "y");
      } else {
        this.setPosition(this.cargos[i], this.spaceMinZ + this.cargos[i].parameters.length / 2, "z");
        this.setPosition(this.cargos[i], this.cargos[i].parameters.height / 2, "y");

        this.setPosition(
          this.cargos[i],
          this.previous.block.position.x +
            this.previous.parameters.width / 2 +
            this.cargos[i].parameters.width / 2 +
            0.1,
          "x"
        );
      }

      if (this.countSpace >= 1) {
        this.setPosition(this.cargos[i], -90, "x");
        this.setPosition(this.cargos[i], -90, "z");
        this.offset(this.cargos[i], "+x");
      } else {
        // Сдвиг блока
        this.arrange(this.cargos[i]);
      }

      // Ставим следующий блок, относительно предыдущего X
      // if (this.previous.parameters.width === this.cargos[i].parameters.width) {
      //   this.setPosition(this.cargos[i], this.previous.block.position.x, "x");
      // } else {
      //   this.setPosition(this.cargos[i], this.spaceMinZ + this.cargos[i].parameters.length / 2, "z");
      //   this.setPosition(
      //     this.cargos[i],
      //     this.previous.block.position.x +
      //       this.previous.parameters.width / 2 +
      //       this.cargos[i].parameters.width / 2 +
      //       0.1,
      //     "x"
      //   );
      // }

      // Ставим следующий блок, относительно предыдущего Y
      // if (this.previous.parameters.height == this.cargos[i].parameters.height) {
      //   this.setPosition(this.cargos[i], this.previous.block.position.y, "y");
      // } else {
      //   this.setPosition(this.cargos[i], this.cargos[i].parameters.height / 2, "y");
      // }

      // if (this.isSwap) {
      //   i = -1;
      //   this.isSwap = false;
      // }
    }
  }

  // Проверка на коллизию
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

  // Место для расположения всех неотсортированных коробок
  defaultPosition() {
    for (let i = 0; i < this.cargos.length; i++) {
      this.setPosition(this.cargos[i], -this.cargos[i].parameters.height / 2 - 10, "y");
    }
  }

  // Расстановка блоков
  arrange(cargo) {
    // Сдвигать по оси Z, если есть еще место
    if (!this.isOutwardsMaxZ(cargo)) {
      this.offset(cargo, "+z");
    }

    // Если блок вышел за пределы контейнера по Z
    if (this.isOutwardsMaxZ(cargo)) {
      this.setPosition(cargo, this.spaceMinZ + cargo.parameters.length / 2, "z");

      if (this.isTier) {
        this.offset(cargo, "+y");
      } else this.offset(cargo, "+x");
    }

    // Если блок вышел за пределы контейнера по Y
    if (this.isOutwardsMaxY(cargo)) {
      this.setPosition(cargo, cargo.parameters.height / 2, "y");
      this.offset(cargo, "+x");
    }

    if (this.isOutwardsMaxX(cargo)) {
      this.countSpace++;
      this.setPosition(cargo, cargo.parameters.height / 2, "y");
      this.setPosition(cargo, -100, "x");
      this.setPosition(cargo, -90, "z");
    }
  }

  // Сдвиг с проверкой на коллизию
  offset(cargo, direction) {
    const step = 0.1;
    let buff = 0;

    while (this.isCollision(cargo)) {
      if (direction === "+z") {
        this.setPosition(cargo, step, direction);
        buff += step;

        // if (buff.toFixed(2) > cargo.parameters.length + step) {
        //   // console.log(Math.round(buff));
        //   // while (this.isCollision(cargo)) {
        //   //   this.setPosition(cargo, step, "+x");
        //   // }
        //   // console.log(cargo.block.name);
        //   this.swap(cargo.block.name);
        //   this.defaultPosition();
        //   this.isSwap = true;
        //   return;
        // }
      } else {
        this.setPosition(cargo, step, direction);
      }
    }
  }

  // Проверка пересечения контейнера по оси +Z
  isOutwardsMaxZ(cargo) {
    return cargo.block.position.z + cargo.parameters.length / 2 > this.spaceMaxZ ? true : false;
  }

  // Проверка пересечения контейнера по оси +Y
  isOutwardsMaxY(cargo) {
    return cargo.block.position.y + cargo.parameters.height / 2 > this.spaceMaxY ? true : false;
  }

  isOutwardsMaxX(cargo) {
    return cargo.block.position.x + cargo.parameters.width / 2 > this.spaceMaxX ? true : false;
  }

  // swap(name) {
  //   this.cargos = [
  //     ...this.cargos.filter((cargo) => cargo.block.name === name),
  //     ...this.cargos.filter((cargo) => cargo.block.name !== name),
  //   ];
  //   return [
  //     ...this.cargos.filter((block) => block.name === name),
  //     ...blocks.filter((block) => block.name !== name),
  //   ];
  // }
}

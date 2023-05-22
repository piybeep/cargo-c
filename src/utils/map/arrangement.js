import * as THREE from "three";
import LoadSpace from "./loadSpace";
import Cargo from "./cargo";

export default class Arrangement {
  constructor({ scene, space, groups, cargos }) {
    // Сцена
    this.scene = scene;

    // Грузовое пространство
    this.space = [new LoadSpace(this.scene, space)];
    this.space[0].create({ x: 0, z: 0 });
    this.spaceMinX = this.space[0].position.faceX.min;
    this.spaceMaxX = this.space[0].position.faceX.max;
    this.spaceMaxY = this.space[0].position.faceY.max;
    this.spaceMinZ = this.space[0].position.faceZ.min;
    this.spaceMaxZ = this.space[0].position.faceZ.max;
    this.spaceWidth = Math.abs(this.spaceMinZ) + Math.abs(this.spaceMaxZ);
    this.quantitySpace = 0;

    // Группы грузов
    this.groups = groups;

    // Грузы
    this.cargos = cargos.filter((cargo) => cargo.name !== "platform");
  }

  nextSpace() {
    this.spaceMinX = this.space[this.quantitySpace].position.faceX.min;
    this.spaceMaxX = this.space[this.quantitySpace].position.faceX.max;
    this.spaceMaxY = this.space[this.quantitySpace].position.faceY.max;
    this.spaceMinZ = this.space[this.quantitySpace].position.faceZ.min;
    this.spaceMaxZ = this.space[this.quantitySpace].position.faceZ.max;
  }

  savePreviousGroup(cargo) {
    const currentGroup = cargo.parameters.group;

    if (cargo.parameters.groupId === 0) {
      this.saveGroup = currentGroup;
      this.saveGroupId = cargo.parameters.groupId;
      this.saveCargo = cargo;
      return [0, 0];
    }

    if (currentGroup !== this.saveGroup && this.saveGroupId + 1 === cargo.parameters.groupId) {
      this.saveGroupNext = currentGroup;
      this.saveCargoNext = cargo;
      return [this.saveGroup, this.saveCargo];
    } else {
      this.saveGroup = this.saveGroupNext;
      this.saveGroupId = cargo.parameters.groupId - 1;
      this.saveCargo = this.saveCargoNext;
      return [this.saveGroup, this.saveCargo];
    }
  }

  // Расстановки блоков
  start() {
    // Ставим все блоки за карту, чтобы не мешала расстановке
    this.defaultPosition();

    for (let i = 0; i < this.cargos.length; i++) {
      // Стартовая позиция
      if (i === 0) {
        this.startPosition(this.cargos[i]);
        // continue;
      }
      // Получаем позицию предыдущего блока
      this.previous = this.cargos[i - 1] || this.cargos[i];
      [this.previousGroup, this.previousCargo] = this.savePreviousGroup(this.cargos[i]);

      // Ставим следующий блок, относительно предыдущего
      if (this.cargos[i].parameters.group === this.previous.parameters.group) {
        this.setPosition(this.cargos[i], this.previous.block.position.x, "x");
        this.setPosition(this.cargos[i], this.previous.block.position.y, "y");
        this.setPosition(this.cargos[i], this.previous.block.position.z, "z");
      } else {
        this.setPosition(this.cargos[i], this.spaceMinZ + this.cargos[i].parameters.width / 2, "z");
        this.setPosition(this.cargos[i], this.cargos[i].parameters.height / 2, "y");

        // Ставим по оригинальному блоку, который не перевернут
        if (
          this.previous.parameters.rotated &&
          this.previous.parameters.width !== this.previous.parameters.length
        ) {
          const formula =
            this.previous.block.position.x -
            this.previous.parameters.width / 2 +
            this.cargos[i].parameters.length / 2 +
            this.previous.parameters.length +
            0.1;

          this.setPosition(this.cargos[i], formula, "x");
        } else {
          this.setPosition(
            this.cargos[i],
            this.previous.block.position.x +
              this.previous.parameters.length / 2 +
              this.cargos[i].parameters.length / 2 +
              0.1,
            "x"
          );
        }
      }

      // Если блок слишком большой и выходит за пределы по Z
      if (
        this.previous.parameters.rotated &&
        this.previous.parameters.rotate &&
        this.previous.parameters.width > this.spaceWidth &&
        this.cargos[i].parameters.group !== this.previous.parameters.group
      ) {
        this.cargos[i].block.material.color.set("yellow");
        this.setPosition(
          this.cargos[i],
          this.previous.block.position.x +
            this.previous.parameters.width / 2 +
            this.cargos[i].parameters.length / 2 +
            0.1,
          "x"
        );
      }

      if (this.previousGroup !== 0 && this.previousGroup !== this.cargos[i].parameters.group) {
        // this.cargos[i].block.material.color.set("red");
      }

      this.arrange(this.cargos[i], this.previous);
    }
  }

  rotate(cargo) {
    cargo.block.rotateY(Math.PI / 2);
    cargo.line.rotateY(Math.PI / 2);
    cargo.label.rotateY(Math.PI / 2);
    cargo.parameters.rotated = true;
    // cargo.block.material.color.set("yellow");
  }

  // Место для расположения всех неотсортированных коробок
  defaultPosition() {
    for (let i = 0; i < this.cargos.length; i++) {
      this.setPosition(this.cargos[i], -this.cargos[i].parameters.height / 2 - 10, "y");
    }
  }

  // Расстановка блоков
  arrange(cargo, previous) {
    // Учитываем отступы между блоков
    const baseAmountSpace =
      Math.floor(
        (this.spaceMaxZ + Math.abs(this.spaceMinZ)) /
          (cargo.parameters.width > this.spaceWidth && cargo.parameters.rotate
            ? cargo.parameters.length
            : cargo.parameters.width)
      ) * 0.1;

    // Сколько может поместиться блоков в один контейнер с учетом отступов
    const baseAmount = Math.floor(
      (Math.abs(this.spaceMaxZ) + Math.abs(this.spaceMinZ) - baseAmountSpace) /
        (cargo.parameters.width > this.spaceWidth && cargo.parameters.rotate
          ? cargo.parameters.length
          : cargo.parameters.width)
    );
    // Сколько может поместиться ровное кол-во оснований в один контейнер
    const baseStep = baseAmount * Math.floor(cargo.parameters.count / baseAmount);
    // Если включен параметр turn(переворот)
    if (
      (baseStep != 0 &&
        cargo.parameters.id > baseStep &&
        cargo.parameters.count % baseAmount !== 0 &&
        cargo.parameters.rotate &&
        !previous.parameters.rotated &&
        cargo.parameters.length > cargo.parameters.width) ||
      cargo.parameters.width > this.spaceWidth
    ) {
      this.rotate(cargo);
    }

    if (this.previousCargo !== 0) {
      // Сколько вмещается грузов в ширину
      const cargoCount = Math.floor(this.spaceWidth / this.previousCargo.parameters.width);

      // Остаток
      const residueWidth = this.spaceWidth - cargoCount * this.previousCargo.parameters.width;
      this.test = this.previousCargo.parameters.count * this.previousCargo.parameters.length;
      this.isEmptyPlace =
        cargo.parameters.group !== this.previousGroup && residueWidth > cargo.parameters.width;
      console.log(this.test);
    }

    // Если есть свободное место по Z, сделать проверку и расставить груз
    if (this.previousCargo !== 0 && this.test > (cargo.parameters.id / 2) * cargo.parameters.length) {
      // console.log(Math.floor(this.spaceWidth / this.previousCargo.parameters.width));

      if (
        this.previousGroup !== cargo.parameters.group &&
        cargo.parameters.id === 1 &&
        this.isEmptyPlace
      ) {
        this.setPosition(cargo, this.spaceMinX + cargo.parameters.length / 2, "x");
        cargo.block.material.color.set("yellow");
      }
      cargo.block.material.color.set("lime");

      // if (this.isEmptyPlace) {
      //   this.setPosition(cargo, this.spaceMinZ + cargo.parameters.width / 2, "z");
      // }
    }

    // Сдвигать по оси Z, если есть еще место
    if (!this.isOutwardsMaxZ(cargo)) {
      // Если блок перевернут
      if (
        cargo.parameters.rotate &&
        cargo.parameters.rotated &&
        !previous.parameters.rotated &&
        cargo.parameters.group === previous.parameters.group
      ) {
        this.setPosition(
          cargo,
          previous.block.position.x - previous.parameters.length / 2 + cargo.parameters.width / 2,
          "x"
        );
      }
      // переворачиваем блок, если предыдущий перевернут
      else if (
        previous.parameters.rotated &&
        cargo.parameters.group === previous.parameters.group &&
        cargo.parameters.width < this.spaceWidth
      ) {
        this.rotate(cargo);
      }

      if (this.isTiers(cargo) && !cargo.parameters.row) {
        this.offset(cargo, "+y");
      } else {
        this.offset(cargo, "+z");
      }
    }

    // Если блок вышел за пределы контейнера по Z
    if (this.isOutwardsMaxZ(cargo)) {
      // Если блок перевернут
      const isRotate =
        cargo.parameters.rotate &&
        cargo.parameters.rotated &&
        cargo.parameters.group === previous.parameters.group;

      // Сделать место для не вмещающихся грузов
      if (!isRotate && cargo.parameters.width > this.spaceWidth) {
        const placeOverflow = this.spaceMaxZ + 20 + cargo.parameters.width / 2;
        this.setPosition(cargo, placeOverflow, "z");
        return;
      }

      if (isRotate) {
        this.setPosition(cargo, this.spaceMinZ + cargo.parameters.length / 2, "z");
        // Если предыдущий груз перевернут - ставить по x
        if (previous.parameters.rotated) {
          this.setPosition(cargo, previous.block.position.x, "x");
        } else {
          // Если не перевернут, высчитать и поставить у края не перевернутого блока
          this.setPosition(
            cargo,
            previous.block.position.x - previous.parameters.length / 2 + cargo.parameters.width / 2,
            "x"
          );
        }
      } else if (this.test > (cargo.parameters.id / 2) * cargo.parameters.length) {
        this.setPosition(
          cargo,
          this.spaceMinZ +
            this.saveCargo.parameters.width / 2 +
            this.saveCargo.parameters.width / 2 +
            cargo.parameters.width / 2 +
            0.1,
          "z"
        );
        // this.setPosition(cargo, previous.block.position.x + cargo.parameters.length + 0.1, "x");
      } else {
        this.setPosition(cargo, this.spaceMinZ + cargo.parameters.width / 2, "z");
        // this.setPosition(cargo, this.spaceMinX + cargo.parameters.width / 2, "x");
      }

      if (this.isTiers(cargo)) {
        this.offset(cargo, "+y");
        cargo.block.material.color.set("red");
      } else {
        this.offset(cargo, "+x");
      }
    }

    // Если блок вышел за пределы контейнера по Y
    if (this.isOutwardsMaxY(cargo)) {
      this.setPosition(cargo, cargo.parameters.height / 2, "y");

      if (
        !cargo.parameters.row ||
        (cargo.parameters.width > this.spaceWidth &&
          cargo.parameters.rotated &&
          this.isOutwardsMaxZ(cargo))
      ) {
        this.offset(cargo, "+z");
      } else {
        this.offset(cargo, "+x");
      }
    }

    // Если блок вышел за пределы контейнера по X
    if (this.isOutwardsMaxX(cargo)) {
      this.space.push(new LoadSpace(this.scene, this.space[this.quantitySpace].size));
      this.quantitySpace += 1;
      this.space[this.quantitySpace].create({
        x: 0,
        z:
          this.space[this.quantitySpace !== 0 && this.quantitySpace - 1].position.faceZ.min -
          this.space[this.quantitySpace].size.length,
      });

      this.nextSpace();
      this.startPosition(cargo);
    }
  }

  // Проверка пересечения контейнера по оси +Z
  isOutwardsMaxZ(cargo) {
    if (cargo.parameters.rotate && cargo.parameters.width > this.spaceWidth) {
      return cargo.block.position.z + cargo.parameters.length / 2 > this.spaceMaxZ ? true : false;
    }
    return cargo.block.position.z + cargo.parameters.width / 2 > this.spaceMaxZ ? true : false;
  }

  // Проверка пересечения контейнера по оси +Y
  isOutwardsMaxY(cargo) {
    return cargo.block.position.y + cargo.parameters.height / 2 > this.spaceMaxY ? true : false;
  }

  isOutwardsMaxX(cargo) {
    return cargo.block.position.x + cargo.parameters.length / 2 > this.spaceMaxX ? true : false;
  }

  setPosition(cargo, position, axis) {
    if (axis === "x") {
      cargo.block.position.x = position;
      cargo.line.position.x = position;
      cargo.label.position.x = position;
    } else if (axis === "+x") {
      cargo.block.position.x += position;
      cargo.line.position.x += position;
      cargo.label.position.x += position;
    } else if (axis === "-x") {
      cargo.block.position.x -= position;
      cargo.line.position.x -= position;
      cargo.label.position.x -= position;
    } else if (axis === "y") {
      cargo.block.position.y = position;
      cargo.line.position.y = position;
      cargo.label.position.y = position;
    } else if (axis === "+y") {
      cargo.block.position.y += position;
      cargo.line.position.y += position;
      cargo.label.position.y += position;
    } else if (axis === "-y") {
      cargo.block.position.y -= position;
      cargo.line.position.y -= position;
      cargo.label.position.y -= position;
    } else if (axis === "z") {
      cargo.block.position.z = position;
      cargo.line.position.z = position;
      cargo.label.position.z = position;
    } else if (axis === "+z") {
      cargo.block.position.z += position;
      cargo.line.position.z += position;
      cargo.label.position.z += position;
    } else if (axis === "-z") {
      cargo.block.position.z -= position;
      cargo.line.position.z -= position;
      cargo.label.position.z -= position;
    } else {
      cargo.block.position.y -= position;
      cargo.line.position.y -= position;
      cargo.label.position.y -= position;
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
      } else {
        this.setPosition(cargo, step, direction);
      }
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

  // Установить стартовую позицию внутри контейнера
  startPosition(cargo) {
    if (cargo.parameters.width > this.spaceWidth && cargo.parameters.rotate) {
      this.setPosition(cargo, this.spaceMinX + cargo.parameters.width / 2, "x");
      this.setPosition(cargo, cargo.parameters.height / 2, "y");
      this.setPosition(cargo, this.spaceMinZ + cargo.parameters.length / 2, "z");
    } else {
      this.setPosition(cargo, this.spaceMinX + cargo.parameters.length / 2, "x");
      this.setPosition(cargo, cargo.parameters.height / 2, "y");
      this.setPosition(cargo, this.spaceMinZ + cargo.parameters.width / 2, "z");
    }
  }

  // Фильтр
  filter(cargo, direction) {
    if (cargo.parameters.rotated && direction === "x") return cargo.parameters.width / 2;
    if (direction === "x") return cargo.parameters.length / 2;

    if (cargo.parameters.rotated && direction === "z") return cargo.parameters.length;
    if (direction === "z") return cargo.parameters.width / 2;

    // if (cargo.parameters.rotated && direction === "y") return cargo.parameters.width / 2;
    // if (direction === "y") return cargo.parameters.height / 2;
  }

  isTiers(cargo) {
    return (
      cargo.parameters.tiers === "Да - оптимально" ||
      cargo.parameters.tiers === "Да - только на другой груз" ||
      cargo.parameters.tiers === "Да - максимально"
    );
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

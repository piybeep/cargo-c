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

    // Сохранение групп
    this.previousGroup = [];
    this.previousLastCargo = 0;
    this.previousFirstCargo = 0;
    this.fullLength = 0;
    this.uuidForStep = true;
    this.stepBackGroup = 1;
    this.isStepBackGroup = true;
    this.saveStepPointPerZ = 0;
  }

  nextSpace() {
    this.spaceMinX = this.space[this.quantitySpace].position.faceX.min;
    this.spaceMaxX = this.space[this.quantitySpace].position.faceX.max;
    this.spaceMaxY = this.space[this.quantitySpace].position.faceY.max;
    this.spaceMinZ = this.space[this.quantitySpace].position.faceZ.min;
    this.spaceMaxZ = this.space[this.quantitySpace].position.faceZ.max;
  }

  // savePreviousGroup(cargo) {
  //   const currentGroup = cargo.parameters.group;

  //   if (cargo.parameters.groupId === 0) {
  //     this.saveGroup = currentGroup;
  //     this.saveGroupId = cargo.parameters.groupId;
  //     this.saveCargo = cargo;
  //     return [0, 0];
  //   }

  //   if (currentGroup !== this.saveGroup && this.saveGroupId + 1 === cargo.parameters.groupId) {
  //     this.saveGroupNext = currentGroup;
  //     this.saveCargoNext = cargo;
  //     return [this.saveGroup, this.saveCargo];
  //   } else {
  //     this.saveGroup = this.saveGroupNext;
  //     this.saveGroupId = cargo.parameters.groupId - 1;
  //     this.saveCargo = this.saveCargoNext;
  //     return [this.saveGroup, this.saveCargo];
  //   }
  // }

  // Расстановки блоков
  start() {
    // Ставим все блоки за карту, чтобы не мешала расстановке
    this.defaultPosition();

    for (let i = 0, g = 0; i < this.cargos.length; i++) {
      // Получаем позицию предыдущего блока
      this.previous = this.cargos[i - 1] || this.cargos[i];

      // Ставим следующий блок, относительно предыдущего
      if (this.cargos[i].parameters.group === this.previous.parameters.group) {
        this.setPosition(this.cargos[i], this.previous.block.position.x, "x");
        this.setPosition(this.cargos[i], this.previous.block.position.y, "y");
        this.setPosition(this.cargos[i], this.previous.block.position.z, "z");

        this.fullLength += this.cargos[i].parameters.length;
        this.cargos[i].parameters.fullLength = this.fullLength;
      }

      // Если следующий груз в другой группе
      if (this.cargos[i].parameters.group !== this.previous.parameters.group) {
        this.stepBackGroup = 1;
        this.isStepBackGroup = true;

        // Сохраняем всю предыдущую группу
        this.previousCargosGroup = this.cargos.filter(
          (cargo) => cargo.parameters.group === this.previous.parameters.group
        );

        // Сохраняем первый груз предыдущей группы
        this.previousFirstCargo = this.previousCargosGroup[0];

        // Сохраняем последний груз предыдущей группы
        this.previousLastCargo = this.previous;

        // Сохраняем id группы
        this.previousIdGroup = this.previous.parameters.groupId;

        // ***************************************************
        // Конфигурация для бокового пространства
        // ! ! ! Предыдущая группа
        // -- Расчет вмещаемых грузов по оси Z и свободного пространства
        const previousCargoWidth = this.previous.parameters.width;
        const previousAvailableCountZ = Math.floor(this.spaceWidth / previousCargoWidth);
        const previousCount = this.previous.parameters.count;
        // -- Количество грузов в ширину
        const previousCountPerZ =
          previousAvailableCountZ >= previousCount ? previousCount : previousAvailableCountZ;
        //    |
        // -- Остаток свободного места по ширине
        let freeSpaceWidth;
        if (g === 0 || this.cargos[i].parameters.width + this.previousGroup[g - 1].freeSpaceWidth < 0) {
          freeSpaceWidth = this.spaceWidth - previousCountPerZ * previousCargoWidth;
        } else {
          freeSpaceWidth = this.previousGroup[g - 1].freeSpaceWidth;
        }
        //    |
        // -- Расчет вмещаемых грузов по оси X и свободного пространства
        // -- Количество грузов в длину
        const previousCountPerX = Math.ceil(previousCount / previousCountPerZ);

        // Сохраняем группу
        this.previousGroup.push({
          id: this.previousIdGroup,
          parameters: this.previous.parameters,
          first: this.previousFirstCargo,
          last: this.previousLastCargo,
          fullLength: this.fullLength,
          cargos: this.previousCargosGroup,
          freeSpaceWidth: freeSpaceWidth,
          amount: {
            axisZ: previousCountPerZ,
            axisX: previousCountPerX,
          },
          isContain: false,
        });

        // Обнуляем информацию ширины прошлой группы
        this.fullLength = 0;
        this.fullLength += this.cargos[i].parameters.length;
        this.cargos[i].parameters.fullLength = this.fullLength;
        g += 1;

        // this.previousFirstCargo.block.material.color.set("springgreen");
        // this.previousLastCargo.block.material.color.set("springgreen");

        this.setPosition(this.cargos[i], this.previousFirstCargo.block.position.z, "z");
        this.setPosition(this.cargos[i], this.cargos[i].parameters.height / 2, "y");

        // Ставим по оригинальному блоку, который не перевернут
        const condition =
          this.previous.parameters.rotated && this.previous.parameters.width !== this.previous.parameters.length;

        if (condition) {
          const formula =
            this.previous.block.position.x -
            this.previous.parameters.width / 2 +
            this.cargos[i].parameters.length / 2 +
            this.previous.parameters.length +
            0.1;

          this.setPosition(this.cargos[i], formula, "x");
        } else {
          this.setPosition(this.cargos[i], this.previousFirstCargo.block.position.x, "x");
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

      // Стартовая позиция
      if (i === 0) {
        this.startPosition(this.cargos[i]);
        continue;
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
        cargo.parameters.id + 1 > baseStep &&
        cargo.parameters.count % baseAmount !== 0 &&
        cargo.parameters.rotate &&
        !previous.parameters.rotated &&
        cargo.parameters.length > cargo.parameters.width) ||
      cargo.parameters.width > this.spaceWidth
    ) {
      this.rotate(cargo);
    }

    // if (this.previousCargo !== 0) {
    //   // Сколько вмещается грузов в предыдущей группе в ширину
    //   const availableCountPrevious = Math.floor(this.spaceWidth / this.previousCargo.parameters.width);

    //   // Остаток свободного места после размещения предыдущей группы
    //   this.residueWidth = this.spaceWidth - availableCountPrevious * this.previousCargo.parameters.width;
    //   console.log(this.residueWidth);
    //   // Общая длина предыдущей группы по оси X
    //   this.totalLengthPrevious =
    //     this.previousCargo.parameters.count * this.previousCargo.parameters.length;

    //   // Сколько вмещается текущих грузов по оси Z в остатке свободного места
    //   this.availableCountCurrentZ = Math.floor(this.residueWidth / cargo.parameters.width);

    //   // Сколько вмещается текущих грузов по оси Y
    //   this.availableCountCurrentY = this.isTiers(cargo)
    //     ? Math.floor(this.spaceMaxY / cargo.parameters.height)
    //     : 1;
    //   // Длина текущих грузов по оси X
    //   this.totalLengthCurrent =
    //     Math.floor(
    //       (cargo.parameters.id - 1) / (this.availableCountCurrentZ * this.availableCountCurrentY)
    //     ) * cargo.parameters.length;

    //   // Есть ли пустое место от прошлой группы
    //   this.isEmptyPlace =
    //     cargo.parameters.group !== this.previousGroup && this.residueWidth > cargo.parameters.width;
    // }

    // // Если есть свободное место по Z, сделать проверку и расставить груз
    // if (
    //   this.previousCargo !== 0 &&
    //   this.totalLengthPrevious > this.totalLengthCurrent &&
    //   this.previousGroup !== cargo.parameters.group &&
    //   cargo.parameters.id === 1 &&
    //   this.isEmptyPlace
    // ) {
    //   this.setPosition(cargo, this.spaceMinX + cargo.parameters.length / 2, "x");
    // }

    // Сдвигать по оси Z, если есть еще место

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

    // Сдвиг по оси Z
    // Позиция текущего груза

    // if (this.isTiers(cargo) && !cargo.parameters.row) {
    //   this.offset(cargo, "+y");
    // } else {
    //   this.offset(cargo, "+z");
    // }

    // Если блок вышел за пределы контейнера по Z

    // Если блок перевернут
    const isRotate =
      cargo.parameters.rotate && cargo.parameters.rotated && cargo.parameters.group === previous.parameters.group;

    // Сделать место для не вмещающихся грузов
    if (!isRotate && cargo.parameters.width > this.spaceWidth) {
      const placeOverflow = this.spaceMaxZ + 20 + cargo.parameters.width / 2;
      this.setPosition(cargo, placeOverflow, "z");
      return;
    }

    this.setPosition(cargo, this.spaceMinZ + cargo.parameters.width / 2, "z");

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
    }

    // if (this.totalLengthPrevious > this.totalLengthCurrent) {
    //   this.setPosition(
    //     cargo,
    //     this.spaceMinZ +
    //       this.saveCargo.parameters.width / 2 +
    //       this.saveCargo.parameters.width / 2 +
    //       cargo.parameters.width / 2 +
    //       0.1,
    //     "z"
    //   );
    // }

    // Если блок вышел за пределы контейнера по Y
    if (this.isOutwardsMaxY(cargo)) {
      this.setPosition(cargo, cargo.parameters.height / 2, "y");

      if (
        !cargo.parameters.row ||
        (cargo.parameters.width > this.spaceWidth && cargo.parameters.rotated && this.isOutwardsMaxZ(cargo))
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

    this.smartOffset(cargo);
  }

  smartOffset(cargo) {
    // Сдвиг текущего груза по X
    let offsetPX = 0;
    // Сдвиг текущего груза по Z
    let offsetPZ = 0;

    // Позиция текущего груза X
    // const cargoNumber = cargo.parameters.id + 1;
    const cargoNumber = cargo.parameters.count;
    // Позиция текущего груза X
    const cargoPX = cargo.block.position.x;
    // Длина текущего груза
    const cargoLength = cargo.parameters.length;
    // Ширина текущего груза
    const cargoWidth = cargo.parameters.width;
    // Количество текущего груза
    const cargoCount = cargo.parameters.count;
    // Предыдущий груз
    const previousCargo = {
      x: this.previous.block.position.x,
      y: this.previous.block.position.y,
      z: this.previous.block.position.z,
      width: this.previous.parameters.width,
      length: this.previous.parameters.length,
      height: this.previous.parameters.height,
    };

    if (this.previousFirstCargo) {
      // Полное количество грузов предыдущей группы
      const previousCountCargo =
        this.previousGroup[cargo.parameters.groupId - this.stepBackGroup].first.parameters.count;

      // Позиция первого груза в предыдущей группе
      const firstCargoPZ =
        this.previousGroup[cargo.parameters.groupId - this.stepBackGroup].first.block.position.z;
      const firstCargoPX =
        this.previousGroup[cargo.parameters.groupId - this.stepBackGroup].first.block.position.x;
      const previousCargoWidth =
        this.previousGroup[cargo.parameters.groupId - this.stepBackGroup].first.parameters.width;
      const previousCargoLength =
        this.previousGroup[cargo.parameters.groupId - this.stepBackGroup].first.parameters.length;

      // Позиция последнего груза в предыдущей группе
      const lastCargoPX = this.previousGroup[cargo.parameters.groupId - this.stepBackGroup].last.block.position.x;
      const lastCargoPZ = this.previousGroup[cargo.parameters.groupId - this.stepBackGroup].last.block.position.z;

      const findDiffGroup = this.previous.parameters.group !== cargo.parameters.group;

      // ***************************************************
      // Конфигурация для бокового пространства
      // ! ! ! Предыдущая группа
      // -- Расчет вмещаемых грузов по оси Z и свободного пространства
      const previousAvailableCountZ = Math.floor(this.spaceWidth / previousCargoWidth);
      const previousCount = previousCountCargo;
      // -- Количество грузов по ширине
      const previousCountPerZ = previousAvailableCountZ >= previousCount ? previousCount : previousAvailableCountZ;
      //    |
      // -- Остаток свободного места по ширине
      // if (previousCount % previousCountPerZ !== 0) {
      // }

      const freeSpaceWidth = this.spaceWidth - previousCountPerZ * previousCargoWidth;

      //    |
      // -- Расчет вмещаемых грузов по оси X и свободного пространства
      // -- Количество грузов по длине
      const previousCountPerX = Math.ceil(previousCountCargo / previousCountPerZ);
      const previousFullLength = previousCountPerX * previousCargoLength;

      // ***************************************************
      // ! ! ! Текущая группа
      // -- Расчет вмещаемых грузов по оси Z и свободного пространства
      const currentAvailableCountZ = Math.floor(
        (this.spaceWidth - previousCountPerZ * previousCargoWidth) / cargoWidth
      );

      const currentCount = cargoNumber;
      // -- Текущее количество грузов по ширине
      const currentCountPerZ = currentAvailableCountZ >= currentCount ? currentCount : currentAvailableCountZ;
      // -- Расчет вмещаемых грузов по оси X и свободного пространства
      // -- Текущее количество грузов по длине
      const currentCountPerX = Math.ceil(currentCount / currentCountPerZ);
      const currentFullLength = currentCountPerX * cargo.parameters.length;

      const stepZ = previousCargo.width / 2 + cargoWidth / 2;
      const stepX = previousCargo.length / 2 + cargoLength / 2;

      for (let i = 0; i < this.previousGroup.length; i++) {
        const group = this.previousGroup[i];
        // Если текущий груз относится к другой группе
        const findDiffGroup = cargo.parameters.groupId !== group.parameters.groupId;

        // Если текущий груз меньше пустого пространства по Z
        const freeSpace = group.freeSpaceWidth >= cargo.parameters.width;

        // Если на текущей группе уже расположены другие блоки
        const isContain = group.isContain;

        // Если есть свободное пространство по оси Z
        const condition1 = findDiffGroup && freeSpace && !isContain;

        if (condition1) {
          // Находим последние блоки группы
          const targetCargoZ = group.cargos[group.amount.axisZ - 1].block.position.z;
          const targetCargoX = group.cargos[group.amount.axisZ - 1].block.position.x;
          console.log(group.amount.axisZ);
          offsetPX = targetCargoX - group.parameters.length / 2 + cargoLength / 2;
          offsetPZ = targetCargoZ + group.parameters.width / 2 + cargoWidth / 2;

          // Сохраняем позицию первого блока по Z откуда он начинается.
          this.saveStepPointPerZ = offsetPZ;

          this.setPosition(cargo, offsetPX, "x");
          this.setPosition(cargo, offsetPZ, "z");
          group.freeSpaceWidth -= currentCountPerZ * cargo.parameters.width;
          group.isContain = true;
          cargo.block.material.color.set("red");
          // cargo.block.material.color.set("red");
          console.log(
            `Номер группы: ${group.id}, свободного места: ${group.freeSpaceWidth}, размер груза: ${cargo.parameters.width}`
          );
          break;
        } else {
          this.setPosition(cargo, previousCargo.x + stepX, "x");
          this.setPosition(cargo, this.spaceMinZ + cargoWidth / 2, "z");
        }
      }

      // // Алгоритм расстановки
      // if (!this.isOutwardsMaxZ(cargo) && findDiffGroup && freeSpaceWidth >= cargoWidth) {
      //   cargo.block.material.color.set("red");
      //   const count = previousAvailableCountZ >= previousCount ? previousCount : previousAvailableCountZ;
      //   const targetCargoZ =
      //     this.previousGroup[cargo.parameters.groupId - this.stepBackGroup].cargos[count - 1].block.position.z;
      //   const targetCargoX =
      //     this.previousGroup[cargo.parameters.groupId - this.stepBackGroup].cargos[count - 1].block.position.x;

      //   offsetPX = targetCargoX - previousCargoLength / 2 + cargoLength / 2;
      //   offsetPZ = targetCargoZ + previousCargoWidth / 2 + cargoWidth / 2;

      //   // Сохраняем позицию первого блока по Z откуда он начинается.
      //   this.saveStepPointPerZ = offsetPZ;

      //   this.setPosition(cargo, offsetPX, "x");
      //   this.setPosition(cargo, offsetPZ, "z");
      // }

      // if (previousFullLength < currentFullLength && this.isStepBackGroup) {
      //   // Если ширина прошлой группы стала меньше, ширины текущей
      //   // Находим груз предыдущей группы, который ближе всех к spaceMinZ
      //   const targetCargoPZ = Math.min(
      //     ...this.previousGroup[cargo.parameters.groupId - this.stepBackGroup].cargos.map(
      //       (cargo) => cargo.block.position.z
      //     )
      //   );

      //   if (previousCount % previousCountPerZ !== 0) {
      //     const test =
      //       this.previousGroup[cargo.parameters.groupId - this.stepBackGroup].cargos[
      //         this.previousGroup[cargo.parameters.groupId - this.stepBackGroup].count - 1
      //       ];

      //     offsetPZ = test.block.position.z + previousCargoWidth / 2 + cargoWidth / 2;
      //   } else {
      //     offsetPZ = targetCargoPZ - previousCargoWidth / 2 + cargoWidth / 2;
      //   }

      //   // Сохраняем позицию первого блока по Z откуда он начинается.
      //   this.saveStepPointPerZ = offsetPZ;
      //   offsetPX = lastCargoPX + previousCargoLength / 2 + cargoLength / 2;

      //   if (cargo.parameters.groupId - (this.stepBackGroup + 1) < 0) {
      //     this.isStepBackGroup = false;
      //   } else {
      //     this.stepBackGroup += 1;
      //   }

      //   this.setPosition(cargo, offsetPX, "x");
      //   this.setPosition(cargo, offsetPZ, "z");
      //   return;
      // }

      // if (!this.isOutwardsMaxZ(cargo) && findDiffGroup && freeSpaceWidth < cargoWidth) {
      //   offsetPX = previousCargo.x + previousCargo.length / 2 + cargoLength / 2;
      //   offsetPZ = this.spaceMinZ + cargoWidth / 2;
      //   this.setPosition(cargo, offsetPX, "x");
      //   this.setPosition(cargo, offsetPZ, "z");
      // }

      if (!this.isOutwardsMaxZ(cargo) && !findDiffGroup) {
        offsetPX = previousCargo.x;
        offsetPZ = previousCargo.z + previousCargo.width / 2 + cargoWidth / 2;
        this.setPosition(cargo, offsetPX, "x");
        this.setPosition(cargo, offsetPZ, "z");
      }

      // Если груз вышел за приделы контейнера
      if (this.isOutwardsMaxZ(cargo)) {
        offsetPX = previousCargo.x + previousCargo.length / 2 + cargoLength / 2;
        if (this.saveStepPointPerZ) {
          offsetPZ = this.saveStepPointPerZ;
        } else {
          offsetPZ = this.spaceMinZ + cargoWidth / 2;
        }

        this.setPosition(cargo, offsetPX, "x");
        this.setPosition(cargo, offsetPZ, "z");
        cargo.block.material.color.set("lime");
      }

      // Установить позицию груза
    } else {
      // Сдвиг текущего груза по X
      if (!previousCargo) {
        return;
      }

      if (!this.isOutwardsMaxZ(cargo)) {
        offsetPZ = previousCargo.z + cargoWidth;
        this.setPosition(cargo, offsetPZ, "z");
        // cargo.block.material.color.set("yellow");
      }

      if (this.isOutwardsMaxZ(cargo)) {
        offsetPX = previousCargo.x + cargoLength;
        offsetPZ = this.spaceMinZ + cargoWidth / 2;
        this.setPosition(cargo, offsetPX, "x");
        this.setPosition(cargo, offsetPZ, "z");
      }
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
    const step = 0.01;
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

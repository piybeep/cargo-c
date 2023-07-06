import * as THREE from "three";
import LoadSpace from "./loadSpace";

import {
  findOptimalPosition,
  getCargo,
  getIdAvailableGroup,
  getLastColumn,
  getSpace,
  join,
  saveBuffColumns,
} from "./tools";
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
    this.buffSpace = 0;
    this.firstPerColumn = 0;

    this.groupList = [];
    this.groupColumn = [];
    this.lastIndexGroup = 0;
    this.cargosBuff = [];
    this.groupsBuff = [];
    this.cargosBuffPerX = [];
    this.buff = {
      perX: 0,
      perZ: 0,
      group: 0,
      startPos: 0,
    };
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

  compare(a, b) {
    if (a.parameters.length > b.parameters.length) {
      return -1;
    }
    if (a.parameters.length < b.parameters.length) {
      return 1;
    }
    return 0;
  }
  // Расстановки блоков
  start() {
    // Ставим все блоки за карту, чтобы не мешала расстановке
    this.defaultPosition();
    this.cargos.sort(this.compare);

    for (let i = 0, g = -1; i < this.cargos.length; i++) {
      if (this.cargos[i].parameters.id === 0) {
        g++;
        this.groupsBuff.push([
          [],
          {
            column: 1,
            step: 2,
            buffPerWidth: 0,
            buffRemainder: 0,
            buffCountCargo: 0,
            buffStep: [],
            remainderSpace: 0,
            amount: this.cargos[i].parameters.count,
            groupId: this.cargos[i].parameters.groupId,
          },
        ]);
      }

      this.groupsBuff[g][0].push(this.cargos[i]);
      // console.log(this.groupsBuff[g]);
      this.cargosBuff.push(this.cargos[i]);

      // Получаем позицию предыдущего блока
      this.previous = this.cargos[i - 1] || this.cargos[i];

      // Добавляем новую группу в массив
      if (this.cargos[i].parameters.id === 0) {
        // console.log(`[\x1b[92m=\x1b[0m] Группа: \x1b[92m${this.cargos[i].parameters.group}\x1b[0m создана`);

        // Предыдущая группа
        this.lastIndexGroup = this.groupList.length ? this.groupList.length - 1 : 0;
        const previousGroup = this.groupList[this.lastIndexGroup];

        // Сохраняем группу
        const cargoGroup = this.cargos.filter(
          (cargo) => cargo.parameters.group === this.cargos[i].parameters.group
        );
        // Сохраняем группу в буфер
        // this.groupsBuff.push(cargoGroup);

        // Сохраняем id группы
        const groupId = cargoGroup[0].parameters.groupId;

        // ***************************************************
        // Конфигурация для бокового пространства

        //    |
        // -- Расчет вмещаемых грузов по оси Z и свободного пространства
        const cargoWidth = this.cargos[i].parameters.width;
        const cargoLength = this.cargos[i].parameters.length;
        const amountCargo = this.cargos[i].parameters.count;

        //    |
        // -- Создаем переменную в которой будем высчитывать занятую площадь по Z
        this.occupiedAreaZ = this.groupList
          .map((group) => group.amount.axisZ * group.parameters.width)
          .reduce((prev, curr) => prev + curr, 0);

        //    |
        // Доступное количество груза по оси Z
        const freeSpace = this.spaceWidth - this.occupiedAreaZ;

        const availableCountZ = Math.floor(freeSpace / cargoWidth);

        //    |
        // -- Количество грузов в ширину
        const currentCountPerZ = availableCountZ >= amountCargo ? amountCargo : availableCountZ;

        //    |
        // -- Расчет вмещаемых грузов по оси X и свободного пространства
        // -- Количество грузов в длину
        const currentCountPerX = Math.ceil(amountCargo / currentCountPerZ);

        // -- Длинна рядов
        const fullLength = currentCountPerX * cargoLength;

        // Сохраняем группу
        this.groupList.push({
          id: groupId,
          name: this.cargos[i].parameters.group,
          parameters: this.cargos[i].parameters,
          cargos: cargoGroup,
          full: {
            length: fullLength,
          },
          free: {
            width: freeSpace,
          },
          startColumnPosition: this.startColumnPosition,
          amount: {
            axisZ: currentCountPerZ,
            axisX: currentCountPerX,
          },
          tools: {
            isEqual: false,
            forget: [],
          },
          save: {
            x: 0,
            z: 0,
            y: 0,
          },
          isContain: false,
        });

        // Обнуляем информацию ширины прошлой группы
        this.fullLength = 0;
        this.fullLength += this.cargos[i].parameters.length;
        this.cargos[i].parameters.fullLength = this.fullLength;
      }

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
        this.setPosition(this.cargos[i], this.previous.block.position.z, "z");
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
          this.setPosition(
            this.cargos[i],
            this.previous.block.position.x - this.cargos[i].parameters.length / 2,
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

    // this.setPosition(cargo, this.spaceMinZ + cargo.parameters.width / 2, "z");

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
    // Длина буферной группы
    const bLength = this.groupsBuff.length;

    for (let i = bLength === 1 ? bLength : bLength - 2; i >= 0; i--) {
      // Текущие настройки группы
      const cGroupSettings = this.groupsBuff[bLength - 1][1];

      // Получить значение свободного пространства
      const space = getSpace(this.groupsBuff, this.spaceWidth, this.buffSpace);

      if (cargo.parameters.width <= space) {
        // Найти предыдущий груз
        const optimalPosition = findOptimalPosition(this.groupsBuff, cargo, this.spaceWidth);
        const target = optimalPosition && cargo.parameters.id === 0 ? optimalPosition : this.previous;

        this.setPosition(cargo, join(target, cargo, "z"), "z");
        this.setPosition(cargo, join(target, cargo, "x"), "x");

        break;
      }

      if (cargo.parameters.width > space) {
        // Увеличиваем колонку группы
        cGroupSettings.column++;

        // Проверяем группы грузов, если текущая больше по длине - получаем id группы меньшей
        const idTargetGroup = getIdAvailableGroup(this.groupsBuff, cargo);

        // Находим первый груз в последней колонке
        const lastColumn = getLastColumn(this.groupsBuff[idTargetGroup]);
        let firstCargoLastColumn = this.groupsBuff[idTargetGroup][0][lastColumn];

        // Находим последний груз в колонке
        const id = this.groupsBuff[bLength - 1][0].length - 2;
        let lastCargoLastColumn = this.groupsBuff[bLength - 1][0][id];

        this.setPosition(cargo, join(firstCargoLastColumn, cargo, "ox"), "x");
        this.setPosition(cargo, join(firstCargoLastColumn, cargo, "iz"), "z");

        // Эта проверка нужна для правильного выделения свободного пространства.
        // В зависимости от перемещения груза в другую группу учитывать размеры грузов новой группы

        const length = cGroupSettings.buffStep.length;
        if (idTargetGroup !== bLength - 1) {
          // Получаем полную ширину новой группы
          const total = this.groupsBuff[idTargetGroup][0][0].parameters.count;
          const widthNewGroup = this.groupsBuff[idTargetGroup][0][0].parameters.width * total;

          // Сохраняем информацию о предыдущих колонках, при переходе выше на новую группу
          saveBuffColumns(this.groupsBuff, cargo);

          cGroupSettings.buffPerWidth += widthNewGroup;

          const additionally = cGroupSettings.buffStep[length].countPerColumn;

          cGroupSettings.buffCountCargo = widthNewGroup / cargo.parameters.width + additionally;
        }

        cargo.block.material.color.set("lime");
        const bSpace = (lastCargoLastColumn.parameters.id + 1) * cargo.parameters.width;

        this.buffSpace = bSpace + cGroupSettings.buffPerWidth;

        // Сохраняем в буфер

        // this.firstPerColumn = cargo.parameters.id;

        break;
      }
    }
    // if (freeSpace < 0 && false) {
    //   console.log(`\x1b[95m[+] Новая колонка создана!`);
    //   const saveArr = this.cargosBuff.slice(0, this.cargosBuff.length - 1);
    //   const saveFirstElemNewGroup = this.cargosBuff[this.cargosBuff.length - 1];
    //   this.cargosBuff = [saveFirstElemNewGroup];

    //   this.groupColumn.push(saveArr);

    //   freeSpace = this.spaceWidth - cargo.parameters.width;

    //   // currentGroup.save.z = 0;
    //   this.test = true;
    // }

    //    |
    // -- Количество грузов в ширину
    // const currentCountPerZ = availableCountZ >= amountCargo ? amountCargo : availableCountZ;

    //    |
    // -- Расчет вмещаемых грузов по оси X и свободного пространства
    // -- Количество грузов в длину
    // const currentCountPerX = Math.ceil(amountCargo / currentCountPerZ);

    // console.log(freeSpace);
    // const a = this.cargosBuff.find((item) => {
    //   if (item.parameters.groupId !== cargo.parameters.groupId && ) {
    //     return true;
    //   }
    // });

    // console.log(
    //   `Свободное пространство: \x1b[91m${freeSpace}\x1b[0m м.\t |\t груз: \x1b[91m${
    //     cargo.parameters.id + 1
    //   }\x1b[0m\t |\t ширина: \x1b[91m${currentFullLength}\x1b[0m`
    // );
    const findDiffGroup = this.previous.parameters.group !== cargo.parameters.group;

    // for (let i = 0; i < this.groupList.length - 1 && false; i++) {
    //   const group = this.groupList[i];

    //   // Если грузы
    //   const equal = group.amount.axisZ * group.amount.axisX === group.parameters.count;
    //   let groupFullLength = group.full.length;

    //   if (!equal) {
    //     groupFullLength = group.amount.axisX * group.parameters.length - group.parameters.length;
    //   }

    //   // Если текущий груз относится к другой группе
    //   const findDiffGroup = cargo.parameters.groupId !== group.parameters.groupId;

    //   // Если текущий груз меньше пустого пространства по Z
    //   const freeSpace = group.free.width >= cargo.parameters.width;

    //   // Если на текущей группе уже расположены другие блоки
    //   const isContain = group.isContain;

    //   this.forgottenGroups = currentGroup.tools.forget.filter((name) => name === group.name).includes(group.name);

    //   if (currentFullLength > groupFullLength && equal && !this.forgottenGroups) {
    //     const targetCargoX = group.cargos[group.cargos.length - 1].block.position.x;
    //     const targetCargoZ = group.cargos[0].block.position.z;

    //     offsetPX = targetCargoX + group.parameters.length / 2 + cargoLength / 2;
    //     offsetPZ = targetCargoZ - group.parameters.width / 2 + cargoWidth / 2;

    //     // Сохраняем позицию первого блока по Z откуда он начинается.
    //     currentGroup.save.x = offsetPX;
    //     currentGroup.save.z = offsetPZ;

    //     this.setPosition(cargo, offsetPX, "x");
    //     this.setPosition(cargo, offsetPZ, "z");

    //     currentGroup.tools.forget.push(group.name);
    //     return;
    //   } else if (currentFullLength > groupFullLength && !equal && !this.forgottenGroups) {
    //     const targetCargoX = group.cargos[group.cargos.length - 1].block.position.x;
    //     const targetCargoZ = group.cargos[group.cargos.length - 1].block.position.z;

    //     offsetPX = targetCargoX - group.parameters.length / 2 + cargoLength / 2;
    //     offsetPZ = targetCargoZ + group.parameters.width / 2 + cargoWidth / 2;

    //     this.setPosition(cargo, offsetPX, "x");
    //     this.setPosition(cargo, offsetPZ, "z");

    //     offsetPX = targetCargoX + group.parameters.length / 2 + cargoLength / 2;
    //     offsetPZ = targetCargoZ - group.parameters.width / 2 + cargoWidth / 2;

    //     currentGroup.save.x = offsetPX;
    //     currentGroup.save.z = offsetPZ;
    //     currentGroup.tools.forget.push(group.name);

    //     return;
    //   }

    //   // Если есть свободное пространство по оси Z
    //   const condition1 = findDiffGroup && freeSpace && !isContain;

    //   if (condition1) {
    //     // Находим последние блоки группы
    //     const targetCargoZ = group.cargos[group.amount.axisZ - 1].block.position.z;
    //     const targetCargoX = group.cargos[group.amount.axisZ - 1].block.position.x;

    //     offsetPX = targetCargoX - group.parameters.length / 2 + cargoLength / 2;
    //     offsetPZ = targetCargoZ + group.parameters.width / 2 + cargoWidth / 2;

    //     // Сохраняем позицию первого блока по Z откуда он начинается.
    //     currentGroup.save.z = offsetPZ;

    //     this.setPosition(cargo, offsetPX, "x");
    //     this.setPosition(cargo, offsetPZ, "z");
    //     group.free.width -= cargo.parameters.width * currentGroup.amount.axisZ;

    //     group.isContain = true;
    //     // console.log(
    //     //   `Номер группы: ${group.id}, свободного места: ${group.freeSpaceWidth}, размер груза: ${cargo.parameters.width}`
    //     // );
    //     break;
    //   } else {
    //     this.setPosition(cargo, previousCargo.x, "x");
    //     this.setPosition(cargo, this.spaceMinZ + cargoWidth / 2, "z");
    //   }
    // }

    // Если груз вышел за приделы контейнера
    // if (this.isOutwardsMaxZ(cargo)) {
    //   this.setPosition(cargo, previousCargo.x + cargo.parameters.length, "x");

    //   // Если закончилось свободное пространство по Z, ставим в начало контейнера по Z
    //   if (this.test) {
    //     const index = this.groupColumn.length - 1;
    //     const targetCargo = this.groupColumn[index][0];

    //     // if (this.groupColumn) {
    //     //   this.groupColumn[index]
    //     //     .slice()
    //     //     .reverse()
    //     //     .forEach((item, id, arr) => {
    //     //       if (item.parameters.length >= cargo.parameters.length * 2) {
    //     //         this.setPosition(cargo, arr[id - 1].block.position.x + cargo.parameters.length, "x");
    //     //         this.setPosition(
    //     //           cargo,
    //     //           item.block.position.z + item.parameters.width / 2 + cargo.parameters.width / 2,
    //     //           "z"
    //     //         );
    //     //       }
    //     //     });
    //     //   this.test = false;
    //     //   return;
    //     // }
    //     this.setPosition(
    //       cargo,
    //       targetCargo.block.position.x + targetCargo.parameters.length / 2 + cargo.parameters.length / 2,
    //       "x"
    //     );
    //     this.setPosition(cargo, this.spaceMinZ + cargoWidth / 2, "z");
    //     this.test = false;
    //     return;
    //   }

    //   if (currentGroup.save.z && !currentGroup.save.x) {
    //     this.setPosition(cargo, currentGroup.save.z, "z");

    //     return;
    //   }

    //   if (currentGroup.save.z && currentGroup.save.x) {
    //     this.setPosition(cargo, currentGroup.save.x, "x");
    //     this.setPosition(cargo, currentGroup.save.z, "z");

    //     return;
    //   }

    //   this.setPosition(cargo, this.spaceMinZ + cargoWidth / 2, "z");
    // }

    // if (this.isOutwardsMaxZ(cargo) && this.forgottenGroups) {
    //   this.setPosition(cargo, this.saveStepPointPerX, "x");
    //   this.setPosition(cargo, this.saveStepPointPerZ, "z");

    //   cargo.block.material.color.set("red");
    // }
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
}

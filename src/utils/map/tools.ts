import { BuffGroup, Cargo, Group } from "./interfaces";

export function join(targetCargo: Cargo, currentCargo: Cargo, direction: string): number {
  // i - inside
  // o - outside
  // + - end
  switch (direction) {
    case "x":
      return targetCargo.block.position.x - targetCargo.parameters.length / 2 + currentCargo.parameters.length / 2;
    case "+x":
      return targetCargo.block.position.x + targetCargo.parameters.length / 2 - currentCargo.parameters.length / 2;
    case "ox":
      return targetCargo.block.position.x + targetCargo.parameters.length / 2 + currentCargo.parameters.length / 2;
    case "z":
      return targetCargo.block.position.z + targetCargo.parameters.width / 2 + currentCargo.parameters.width / 2;
    case "iz":
      return targetCargo.block.position.z - targetCargo.parameters.width / 2 + currentCargo.parameters.width / 2;
    case "+iz":
      return targetCargo.block.position.z + targetCargo.parameters.width / 2 - currentCargo.parameters.width / 2;
    default:
      return 0;
  }
}

// Получить свободное пространство
export function getSpace(groups: Group[][][], spaceWidth: number, spaceBuff: number): number {
  let buff = 0;
  for (let i = 0; i < groups.length; i++) {
    for (let j = 0; j < groups[i][0].length; j++) {
      if (groups.length - 1 !== i || groups[i][0].length - 1 !== j) {
        if (groups[i][1].column > 1) {
          buff += groups[i][0][j].parameters.width / groups[i][1].column;
        } else {
          buff += groups[i][0][j].parameters.width;
        }
      }
    }
  }
  // Беда со spaceBuff нужно фиксить
  return spaceWidth - buff + 1;
}

// Получить данные груза
export function getCargo(cargo: Cargo) {
  return {
    length: cargo.parameters.length,
    width: cargo.parameters.width,
    height: cargo.parameters.height,
    x: cargo.block.position.x,
    z: cargo.block.position.z,
    y: cargo.block.position.y,
  };
}

export function getIdAvailableGroup(groups: Group[][][], cargo: Cargo) {
  // Получить количество колонок
  const column = groups[groups.length - 1][1].column;
  const step = groups[groups.length - 1][1].step;

  // Получить id группы
  for (let i = groups.length - step; i >= 0; i--) {
    const previousAmount = groups[i][1].amount;
    const previousColumn = groups[i][1].column;

    if (groups[i][0][0].parameters.length * previousColumn < cargo.parameters.length * column) {
      groups[groups.length - 1][1].step++;
      return i;
    }
    return groups.length - 1;
  }
}

export function getLastColumn(group: BuffGroup): any {
  const buffWidth = group[1].buffPerWidth;
  const buffCountCargo = group[1].buffCountCargo;
  const amountCargos = group[0].length;
  const prevColumn = group[1].column - 1 === 0 ? 1 : group[1].column - 1;

  if (buffWidth) return Math.floor(Math.abs(amountCargos - buffCountCargo - 1));

  return Math.floor(Math.abs(amountCargos / prevColumn - amountCargos));
}

// Функция для сохранения колонок в определенной группе
export function saveBuffColumns(group: BuffGroup[], cargo: Cargo): any {
  const id = group.length - 1;
  const target = group[id][1];
  let columns = target.column - 1;

  if (!target.buffStep.length) {
    columns = target.column - 1;
    target.buffStep.push({
      columns,
      amount: cargo.parameters.id,
      countPerColumn: cargo.parameters.id / columns,
    });
  } else {
    const total = target.buffStep.reduce((a, c) => a + c.amount, 0);
    columns = target.buffStep.reduce((a, c) => a - c.columns, target.column - 1);
    target.buffStep.push({
      columns,
      amount: cargo.parameters.id - total,
      countPerColumn: (cargo.parameters.id - total) / columns,
    });
  }
}

// Функция поиска оптимального расположения груза для новой группы

function isDifferentGroup(groupId: number, cargoId: number) {
  return groupId !== cargoId;
}

function occupiedPlace(cargo: Cargo[], space: number, buff: number): number | object {
  let width = buff;
  for (let i = 0; i < cargo.length; i++) {
    width += cargo[i].parameters.width;
    if (width === space) {
      return 0;
    }
    if (width > space) {
      return [i - 1];
    }
  }
  return width;
}

export function findOptimalPosition(groups: BuffGroup[], cargo: Cargo, space: number) {
  const length = groups.length - 1;

  // Сбор свободного пространства
  let buff: number | object = 0;
  for (let i = 0; i < length; i++) {
    const groupId = groups[i][1].groupId;
    const cargoId = cargo.parameters.groupId;

    // Если группы одинаковые - пропускаем итерацию
    if (!isDifferentGroup(groupId, cargoId)) continue;

    buff = occupiedPlace(groups[i][0], space, buff);
    if (typeof buff === "object") {
      return groups[i][0][buff[0]];
    }
  }
}

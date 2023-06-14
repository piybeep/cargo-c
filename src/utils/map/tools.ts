import { Cargo, Group } from "./interfaces";

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
export function getSpace(groups: Group[][], spaceWidth: number): number {
  let buff = 0;
  for (let i = 0; i < groups.length; i++)
    for (let j = 0; j < groups[i].length; j++)
      if (groups.length - 1 !== i || groups[i].length - 1 !== j) buff += groups[i][j].parameters.width;
  // buff += groups[i][j].parameters.width;

  return spaceWidth - buff;
}

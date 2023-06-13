interface Cargo {
  block: {
    position: {
      x: number;
      y: number;
      z: number;
    };
  };
  parameters: {
    length: number;
    width: number;
  };
}

export function join(targetCargo: Cargo, currentCargo: Cargo, direction: string): number {
  switch (direction) {
    case "x":
      return targetCargo.block.position.x - targetCargo.parameters.length / 2 + currentCargo.parameters.length / 2;
    case "z":
      return targetCargo.block.position.z + targetCargo.parameters.width / 2 + currentCargo.parameters.width / 2;
    default:
      return 0;
  }
}

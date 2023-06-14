export interface Cargo {
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
  length: number;
}

export interface Group extends Cargo {}

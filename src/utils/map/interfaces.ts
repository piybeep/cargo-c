export interface Cargo {
  block: {
    position: {
      x: number;
      y: number;
      z: number;
    };
  };
  parameters: {
    groupId: number;
    length: number;
    width: number;
    height: number;
    count: number;
    id: number;
  };
  length: number;
}

export interface BuffGroup {
  [0]: {
    [0]: Cargo;
    length: number;
  };
  [1]: {
    buffPerWidth: number;
    buffCountCargo: number;
    column: number;
    buffStep: [BuffStep];
    length: string;
    groupId: number;
  };
}

interface BuffStep {
  columns: number;
  amount: number;
  countPerColumn: number;
}

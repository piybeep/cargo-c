type CargosTypes = {
  cargoId: number;
  name: string;
  count: number;
  color: string;
  width: number;
  height: number;
  length: number;
}[];

export const CARGOS: CargosTypes = [
  {
    cargoId: 0,
    name: "default",
    count: 20,
    color: "rgb(20, 100, 120)",
    width: 4,
    height: 4,
    length: 4,
  },
  {
    cargoId: 1,
    name: "pink",
    count: 20,
    color: "pink",
    width: 4,
    height: 4,
    length: 4,
  },
];

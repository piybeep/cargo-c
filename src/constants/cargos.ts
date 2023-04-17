type CargosTypes = {
  cargoId: number;
  name: string;
  color: string;
  width: number;
  height: number;
  length: number;
}[];

export const CARGOS: CargosTypes = [
  {
    cargoId: 0,
    name: "default",
    color: "rgb(20, 100, 120)",
    width: 4,
    height: 4,
    length: 4,
  },
  {
    cargoId: 1,
    name: "red",
    color: "red",
    width: 4,
    height: 4,
    length: 4,
  },
];

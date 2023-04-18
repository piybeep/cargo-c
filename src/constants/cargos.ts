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
    count: 3,
    color: "rgb(20, 100, 120)",
    width: 4,
    height: 7,
    length: 4,
  },
  {
    cargoId: 1,
    name: "pink",
    count: 3,
    color: "pink",
    width: 4,
    height: 4,
    length: 4,
  },
  {
    cargoId: 2,
    name: "red",
    count: 3,
    color: "red",
    width: 20,
    height: 8,
    length: 4,
  },
  {
    cargoId: 3,
    name: "lime",
    count: 15,
    color: "lime",
    width: 4,
    height: 1,
    length: 4,
  },
  {
    cargoId: 3,
    name: "yellow",
    count: 4,
    color: "yellow",
    width: 8,
    height: 1,
    length: 4,
  },
  {
    cargoId: 4,
    name: "blue",
    count: 74,
    color: "blue",
    width: 4,
    height: 3,
    length: 4,
  },
];

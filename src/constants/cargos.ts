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
    name: "group1",
    count: 3,
    color: "rgb(20, 100, 120)",
    width: 4,
    height: 7,
    length: 4,
  },
  {
    cargoId: 1,
    name: "group2",
    count: 3,
    color: "#0fa2a9",
    width: 4,
    height: 4,
    length: 4,
  },
  {
    cargoId: 2,
    name: "group3",
    count: 3,
    color: "#86989a",
    width: 20,
    height: 8,
    length: 4,
  },
  {
    cargoId: 3,
    name: "group4",
    count: 30,
    color: "#00bb00",
    width: 4,
    height: 2,
    length: 4,
  },
];

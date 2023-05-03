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
    name: "group0",
    count: 3,
    color: "rgb(20, 100, 120)",
    width: 25,
    height: 4,
    length: 6,
  },
  {
    cargoId: 1,
    name: "group1",
    count: 20,
    color: "#0fa2a9",
    width: 5,
    height: 8,
    length: 5,
  },
  {
    cargoId: 2,
    name: "group2",
    count: 5,
    color: "#ff8f99",
    width: 8,
    height: 4,
    length: 10,
  },
  {
    cargoId: 3,
    name: "group3",
    count: 25,
    color: "yellow",
    width: 7,
    height: 4,
    length: 10,
  },
  // {
  //   cargoId: 4,
  //   name: "group4",
  //   count: 7,
  //   color: "lime",
  //   width: 4.8,
  //   height: 4,
  //   length: 4,
  // },
];

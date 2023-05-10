enum SizeUnit {
  mm = "мм",
  cm = "см",
  m = "м",
}

type CargosTypes = {
  id: number;
  name: string;
  groupId: string;
  loadSpaceId: string;
  count: number;
  color: string;
  width: number;
  height: number;
  length: number;
  weight: number;
  turn: boolean;
  tilting: boolean;
  isTemplate: boolean;
  sizeUnit: SizeUnit;
}[];

export const CARGOS: CargosTypes = [
  // {
  //   id: 0,
  //   name: "name0",
  //   groupId: "group0",
  //   loadSpaceId: "loadSpace0",
  //   count: 10,
  //   color: "rgb(20, 100, 120)",
  //   width: 8,
  //   height: 8,
  //   length: 8,
  //   weight: 10,
  //   turn: false,
  //   tilting: false,
  //   isTemplate: false,
  //   sizeUnit: SizeUnit.mm,
  // },
  {
    id: 1,
    name: "name1",
    groupId: "group1",
    loadSpaceId: "loadSpace0",
    count: 10,
    color: "rgb(200, 100, 120)",
    width: 7,
    height: 3,
    length: 3,
    weight: 10,
    turn: false,
    tilting: false,
    isTemplate: false,
    sizeUnit: SizeUnit.mm,
  },
  // {
  //   cargoId: 2,
  //   name: "group2",
  //   count: 5,
  //   color: "#ff8f99",
  //   width: 8,
  //   height: 4,
  //   length: 10,
  // },
  // {
  //   cargoId: 3,
  //   name: "group3",
  //   count: 25,
  //   color: "yellow",
  //   width: 7,
  //   height: 4,
  //   length: 10,
  // },
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

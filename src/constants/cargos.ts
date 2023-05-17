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
  tiers: "Нет" | "Да - оптимально" | "Да - только на другой груз" | "Да - максимально";
  sizeUnit: "см" | "мм" | "м";
}[];

export const CARGOS: CargosTypes = [
  {
    id: 0,
    name: "name0",
    groupId: "group0",
    loadSpaceId: "loadSpace0",
    count: 3,
    color: "rgb(20, 100, 120)",
    width: 10,
    height: 4,
    length: 26,
    weight: 4,
    turn: true,
    tilting: false,
    isTemplate: false,
    sizeUnit: "мм",
    tiers: "Да - оптимально",
  },
  {
    id: 1,
    name: "name1",
    groupId: "group1",
    loadSpaceId: "loadSpace0",
    count: 13,
    color: "rgb(200, 100, 120)",
    width: 10,
    height: 3,
    length: 4.5,
    weight: 10,
    turn: true,
    tilting: false,
    isTemplate: false,
    sizeUnit: "мм",
    tiers: "Да - оптимально",
  },
  // {
  //   id: 2,
  //   name: "name2",
  //   groupId: "group2",
  //   loadSpaceId: "loadSpace0",
  //   count: 35,
  //   color: "rgb(20, 200, 20)",
  //   width: 5,
  //   height: 4,
  //   length: 4,
  //   weight: 10,
  //   turn: true,
  //   tilting: false,
  //   isTemplate: false,
  //   sizeUnit: SizeUnit.mm,
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

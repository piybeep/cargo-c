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
  // {
  //   id: 0,
  //   name: "name0",
  //   groupId: "group0",
  //   loadSpaceId: "loadSpace0",
  //   count: 2,
  //   color: "rgb(20, 100, 120)",
  //   width: 7,
  //   height: 3,
  //   length: 7,
  //   weight: 4,
  //   turn: false,
  //   tilting: false,
  //   isTemplate: false,
  //   sizeUnit: "мм",
  //   tiers: "Нет",
  // },
  {
    id: 1,
    name: "name1",
    groupId: "group1",
    loadSpaceId: "loadSpace0",
    count: 4,
    color: "rgb(48, 169, 209);",
    width: 16,
    height: 4,
    length: 4,
    weight: 10,
    turn: false,
    tilting: false,
    isTemplate: false,
    sizeUnit: "мм",
    tiers: "Да - опти2мально",
  },
  {
    id: 2,
    name: "name2",
    groupId: "group2",
    loadSpaceId: "loadSpace0",
    count: 10,
    color: "rgb(148, 169, 209);",
    width: 1,
    height: 1,
    length: 5,
    weight: 10,
    turn: false,
    tilting: false,
    isTemplate: false,
    sizeUnit: "мм",
    tiers: "Да - опт2имально",
  },
  {
    id: 3,
    name: "name3",
    groupId: "group3",
    loadSpaceId: "loadSpace0",
    count: 5,
    color: "rgb(220, 100, 10)",
    width: 3,
    height: 3,
    length: 3,
    weight: 10,
    turn: false,
    tilting: false,
    isTemplate: false,
    sizeUnit: "мм",
    tiers: "Да - о2птимально",
  },
  // {
  //   id: 4,
  //   name: "name4",
  //   groupId: "group4",
  //   loadSpaceId: "loadSpace0",
  //   count: 2,
  //   color: "rgb(0, 200, 200)",
  //   width: 3,
  //   height: 3,
  //   length: 3,
  //   weight: 10,
  //   turn: false,
  //   tilting: false,
  //   isTemplate: false,
  //   sizeUnit: "мм",
  //   tiers: "Да - оптимально",
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

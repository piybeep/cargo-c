export interface cargoEntity {
  name: string
  color: string
  sizeUnit: 'м' | 'см' | 'мм'
  weightUnit: 'тн' | 'кг'
  count: number
  length: number
  width: number
  height: number
  weight: number
  tiers:
    | 'Нет'
    | 'Да - оптимально'
    | 'Да - только на другой груз'
    | 'Да - максимально'
  type: 'Ящик' | 'Коробка' | 'Паллет'
  load: number
  turn: boolean
  tilting: boolean
  isTemplate: boolean
}
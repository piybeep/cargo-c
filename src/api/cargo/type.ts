export interface createCargoProps {
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

export interface cargoEntity extends createCargoProps {
  groupId: string
  id: string
  createdAt:string
  updatedAt:string
}

export interface cargoEntityById extends cargoEntity {
  group: {
    createdAt: string
    hide: boolean
    id: string
    name: string
    position: number
    projectId: number
    updatedAt: string
  }
}

export interface editCargoProps {
  groupId: string
  id: string
  name?: string
  color?: string
  sizeUnit?: 'м' | 'см' | 'мм'
  weightUnit?: 'тн' | 'кг'
  count?: number
  length?: number
  width?: number
  height?: number
  weight?: number
  tiers?:
    | 'Нет'
    | 'Да - оптимально'
    | 'Да - только на другой груз'
    | 'Да - максимально'
  type?: 'Ящик' | 'Коробка' | 'Паллет'
  load?: number
  turn?: boolean
  tilting?: boolean
  isTemplate?: boolean
}

import { Control, UseFormWatch } from 'react-hook-form'

export interface createCargo {
  name: string
  count: number
  length: number
  width: number
  height: number
  weight: number
  type: 'Ящик' | 'Коробка' | 'Паллет'
  tiers:
    | 'Нет'
    | 'Да - оптимально'
    | 'Да - только на другой груз'
    | 'Да - максимально'
  load: number
  turn: boolean
  tilting: boolean
}

export interface BodyProps {
  control: Control<createCargo, any>
  sizeUnit: string
  setUnitLength: React.Dispatch<React.SetStateAction<'мм' | 'м' | 'см'>>
  weightUnit: string
  setUnitWeight: React.Dispatch<React.SetStateAction<'кг' | 'тн'>>
  watch:UseFormWatch<createCargo>
}

import { Control, FieldPath, FieldValues } from 'react-hook-form'
import { ControllerProps } from 'react-spring'

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
  unitLength: string
  setUnitLength: React.Dispatch<React.SetStateAction<string>>
  unitWeight: string
  setUnitWeight: React.Dispatch<React.SetStateAction<string>>
}

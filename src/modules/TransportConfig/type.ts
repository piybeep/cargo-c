import { typeOfTransport } from '@/api/transport/type'

export interface createTrasportInput {
  name: string
  type: typeOfTransport
  weightUnit: 'тн' | 'кг'
  sizeUnit: 'м' | 'см' | 'мм'
  length: number
  width: number
  height: number
  weight: number
  //
  axesCount1: number
  weight1: number
  length1: number
  length2: number
  axleMin1: number
  axleMax1: number
  axle2Min1: number
  axle2Max1: number
  //
  axesCount2: number
  weight2: number
  length3: number
  length4: number
  axleMin2: number
  axleMax2: number
  //
  axesCount3: number
  weight3: number
  length5: number
  length6: number
  axleMin3: number
  axleMax3: number
  axle1Min3: number
  axle2Max3: number
}

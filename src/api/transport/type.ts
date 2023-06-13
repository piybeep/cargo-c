export interface transportEntity {
  id: string
  isTemplate: boolean
  name: string
  type: typeOfTransport
  weightUnit: 'тн' | 'кг'
  sizeUnit: 'м' | 'см' | 'мм'
  length: number
  width: number
  height: number
  weight: number
  transports?:
    | [
        {
          type: 'Фургон грузовой'
          axesCount: number
          weight: number
          length: number
          length1: number
          axle1Min: number
          axle1Max: number
          axle2Min: number
          axle2Max: number
        }
      ]
    | [
        {
          type: 'Тягач с полуприцепом'
          axesCount: number
          weight: number
          length2: number
          length3: number
          axle2Min: number
          axle2Max: number
        },
        {
          type: 'Тягач с полуприцепом'
          axesCount: number
          weight: number
          length: number
          length1: number
          axle1Min: number
          axle1Max: number
          axle2Min: number
          axle2Max: number
        }
      ]
    | [null]
}

export interface createTransportProps {
  name: string
  type: typeOfTransport
  weightUnit: 'тн' | 'кг'
  sizeUnit: 'м' | 'см' | 'мм'
  length: number
  width: number
  height: number
  weight: number
  isTemplate: boolean
  autoDistribution: boolean
  transports?:
    | [
        {
          type: 'Фургон грузовой'
          axesCount: number
          weight: number
          length: number
          length1: number
          axle1Min: number
          axle1Max: number
          axle2Min: number
          axle2Max: number
        }
      ]
    | [
        {
          type: 'Тягач с полуприцепом'
          axesCount: number
          weight: number
          length2: number
          length3: number
          axle2Min: number
          axle2Max: number
        },
        {
          type: 'Тягач с полуприцепом'
          axesCount: number
          weight: number
          length: number
          length1: number
          axle1Min: number
          axle1Max: number
          axle2Min: number
          axle2Max: number
        }
      ]
    | [null]
}

export interface getAllTransportProps {
  page?: number
  size?: number
  tmp?: boolean
}

export interface getAllTransportRes {
  data: transportEntity[]
  count: number
  page: number
  itemCount:number
}

export type typeOfTransport =
  | 'Грузовой автомобиль'
  | 'Морской контейнер'
  | 'Паллет'
  | 'Складская площадь'

export interface transportEntity {
  id: string
  name: string
  type: typeOfTransport
  isTemplate: boolean
  weightUnit: 'тн' | 'кг'
  sizeUnit: 'м' | 'см' | 'мм'
  length: number
  width: number
  height: number
  weight: number
}

export interface getAllTransportProps {
  page?: number
  size?: number
  tmp?: boolean
}

export interface getAllTransportRes{
  data:transportEntity[]
  count:number
  page:number
}

export type typeOfTransport =
  | 'Грузовой автомобиль'
  | 'Морской контейнер'
  | 'Паллет'
  | 'Складская площадь'

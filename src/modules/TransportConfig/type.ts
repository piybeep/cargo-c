import { typeOfTransport } from '@/api/transport/type'

export interface createTrasportInput {
  main: {
    name: string
    type: typeOfTransport
    length: number
    width: number
    height: number
    weight: number
  }
  van: {
    axesCount: number
    weight: number
    length: number
    length1: number
    axle1Min: number
    axle1Max: number
    axle2Min: number
    axle2Max: number
  }
  trailer: {
    axesCount: number
    weight: number
    length2: number
    length3: number
    axle2Min: number
    axle2Max: number
  }
  tractor: {
    axesCount: number
    weight: number
    length: number
    length1: number
    axle1Min: number
    axle1Max: number
    axle2Min: number
    axle2Max: number
  }
}

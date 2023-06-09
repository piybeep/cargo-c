import { instance } from '..'
import {
  cargoEntity,
  cargoEntityById,
  createCargoProps,
  editCargoProps
} from './type'

export const CargoApi = {
  async createCargo({
    groupId,
    ...data
  }: createCargoProps & { groupId: string }) {
    const res = await instance.post(`groups/${groupId}/cargos`, data)
    return res.data
  },
  async getAllCargo<T>({
    groupId,
    templates,
    page
  }: {
    groupId: string
    templates: boolean
    page?: number
  }) {
    const res = await instance.get<
      | cargoEntity[]
      | {
          data: cargoEntity[]
          page: number
          itemCount: number
          pageCount: number
        }
    >(
      `groups/${groupId}/cargos?templates=${templates}&size=10${
        page != undefined && page >= 0 ? '&page=' + page : ''
      }`
    )
    return res.data as T
  },
  async removeCargo({
    groupId,
    cargoId
  }: {
    groupId: string
    cargoId: string
  }) {
    const res = await instance.delete(`groups/${groupId}/cargos/${cargoId}`)
    return res.data
  },
  async getCargoById({
    cargoId,
    groupId
  }: {
    cargoId: string
    groupId: string
  }) {
    const res = await instance.get<cargoEntityById>(
      `groups/${groupId}/cargos/${cargoId}`
    )
    return res.data
  },
  async editCargo(data: editCargoProps) {
    const res = await instance.put<cargoEntityById>(
      `groups/${data.groupId}/cargos/${data.id}`,
      data
    )
    return res.data
  }
}

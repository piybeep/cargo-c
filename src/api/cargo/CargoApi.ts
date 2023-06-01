import { instance } from '..'
import { cargoEntity, createCargoProps } from './type'

export const CargoApi = {
  async createCargo({ groupId, ...data }: createCargoProps & { groupId: string }) {
    const res = await instance.post(`groups/${groupId}/cargos`, data)
    return res.data
  },
  async getAllCargo({
    groupId,
    templates
  }: {
    groupId: string
    templates: boolean
  }) {
    const res = await instance.get<cargoEntity[]>(
      `groups/${groupId}/cargos?templates=${templates}`
    )
    return res.data
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
  }
}

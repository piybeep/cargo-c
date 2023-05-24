import { instance } from '..'
import { cargoEntity, cargoEntityRes } from './type'

export const CargoApi = {
  async createCargo({ groupId, ...data }: cargoEntity & { groupId: string }) {
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
    const res = await instance.get<cargoEntityRes[]>(
      `groups/${groupId}/cargos?templates=${templates}`
    )
    return res.data
  }
}

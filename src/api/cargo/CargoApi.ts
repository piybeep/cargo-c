import { instance } from '..'
import { cargoEntity } from './type'

export const CargoApi = {
  async createCargo({ groupId, ...data }: cargoEntity & { groupId: string }) {
    await instance.post(`groups/${groupId}/cargos`, data)
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
  }
}

import { instance } from '..'
import {
  createTransportProps,
  getAllTransportProps,
  getAllTransportRes,
  transportEntity
} from './type'

export const TransportApi = {
  async getAllTransport({
    page = 0,
    size = 10,
    tmp = false
  }: getAllTransportProps) {
    const res = await instance.get<getAllTransportRes>(
      `loadspaces?page=${page}&size=${size}&tmp=${tmp}`
    )
    return res.data
  },
  async createTransport(data: createTransportProps) {
    const res = await instance.post('loadspaces', data)
    return res.data
  },
  async removeTransport({ id }: { id: string }) {
    const res = await instance.delete(`loadspaces/${id}`)
    return res.data
  },
  async getTransportById(id: string) {
    const res = await instance.get<transportEntity>(`loadspaces/${id}`)
    return res.data
  }
}

import { instance } from '..'
import {
  createTransportProps,
  getAllTransportProps,
  getAllTransportRes,
  transportEntity
} from './type'

export const TransportApi = {
  async getAllTransport({ page, size, tmp = false }: getAllTransportProps) {
    const res = await instance.get<getAllTransportRes>(
      `loadspaces?tmp=${tmp}${
        size !== undefined && size >= 0 ? '&size=' + size : ''
      }${page !== undefined && page >= 0 ? '&page=' + page : ''}`
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
  },
  async editTransport({
    id,
    ...newData
  }: createTransportProps & { id: string }) {
    const res = await instance.put(`loadspaces/${id}`, newData)
    return res.data
  }
}
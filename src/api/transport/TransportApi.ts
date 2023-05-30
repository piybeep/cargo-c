import { instance } from '..'
import {
  createTransportProps,
  getAllTransportProps,
  getAllTransportRes
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
  }
}

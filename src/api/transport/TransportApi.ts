import { instance } from '..'
import { getAllTransportProps, getAllTransportRes } from './type'

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
  }
}

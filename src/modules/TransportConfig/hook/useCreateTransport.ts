import { TransportApi } from '@/api/transport/TransportApi'
import { useMutation } from 'react-query'

export const useCreateTransport = () => {
  return useMutation('createTransport', TransportApi.createTransport)
}

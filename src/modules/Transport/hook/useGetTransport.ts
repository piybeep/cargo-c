import { TransportApi } from '@/api/transport/TransportApi'
import { useQuery } from 'react-query'

export const useGetTransport = ({ tmp }: { tmp: boolean }) => {
  return useQuery('getTransport', () => TransportApi.getAllTransport({ tmp }), {
    keepPreviousData: true
  })
}

import { TransportApi } from '@/api/transport/TransportApi'
import { queryClient } from '@/provider/ReactQueryProvider'
import { useMutation } from 'react-query'

export const useRemoveTransport = () => {
  return useMutation('removeTransport', TransportApi.removeTransport, {
    onSuccess() {
      queryClient.invalidateQueries('getTransport')
    }
  })
}

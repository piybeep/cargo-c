import { TransportApi } from '@/api/transport/TransportApi'
import { queryClient } from '@/provider/ReactQueryProvider'
import { useMutation } from 'react-query'

export const useCreateTransport = () => {
  return useMutation('createTransport', TransportApi.createTransport, {
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['getTransport'],
        refetchInactive: true
      })
    }
  })
}

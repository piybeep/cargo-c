import { TransportApi } from '@/api/transport/TransportApi'
import { queryClient } from '@/provider/ReactQueryProvider'
import { useMutation } from 'react-query'

export const useEditTransport = () => {
  return useMutation('editTransport', TransportApi.editTransport, {
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['getTransport'],
        refetchInactive: true
      })
    }
  })
}

import { TransportApi } from '@/api/transport/TransportApi'
import { queryClient } from '@/provider/ReactQueryProvider'
import { useMutation } from 'react-query'

export const useEditTransport = ({ edit }: { edit?: boolean }) => {
  return useMutation('editTransport', TransportApi.editTransport, {
    onSuccess() {
      if (edit) {
        queryClient.invalidateQueries({
          queryKey: ['getTransportTemplate'],
          refetchInactive: true
        })
      } else {
        queryClient.invalidateQueries({
          queryKey: ['getTransport'],
          refetchInactive: true
        })
      }
    }
  })
}

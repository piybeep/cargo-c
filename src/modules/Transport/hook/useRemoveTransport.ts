import { TransportApi } from '@/api/transport/TransportApi'
import { queryClient } from '@/provider/ReactQueryProvider'
import { useMutation } from 'react-query'

export const useRemoveTransport = ({ template }: { template?: boolean }) => {
  return useMutation('removeTransport', TransportApi.removeTransport, {
    onSuccess() {
      if (template) {
        queryClient.invalidateQueries('getTransportTemplate')
      } else {
        queryClient.invalidateQueries('getTransport')
      }
    }
  })
}

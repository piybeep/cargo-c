import { CargoApi } from '@/api/cargo/CargoApi'
import { queryClient } from '@/provider/ReactQueryProvider'
import { useMutation } from 'react-query'

export const useRemoveCargo = ({
  groupId,
  template
}: {
  groupId: string
  template: boolean
}) => {
  return useMutation(['removeCargo'], CargoApi.removeCargo, {
    onSuccess() {
      if (template) {
        queryClient.invalidateQueries(['getCargoTemplate', groupId, true])
      } else {
        queryClient.invalidateQueries(['getCargo', groupId])
      }
    }
  })
}

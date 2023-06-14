import { CargoApi } from '@/api/cargo/CargoApi'
import { queryClient } from '@/provider/ReactQueryProvider'
import { useMutation } from 'react-query'

export const useEditCargo = ({
  groupId,
  edit
}: {
  groupId: string
  edit?: boolean
}) => {
  return useMutation('editCargo', CargoApi.editCargo, {
    onSuccess(data) {
      if (edit) {
        queryClient.invalidateQueries({
          queryKey: ['getCargoTemplate', groupId, true],
          refetchInactive: true
        })
      } else {
        queryClient.invalidateQueries({
          queryKey: ['getCargo', groupId],
          refetchInactive: true
        })
      }
    }
  })
}

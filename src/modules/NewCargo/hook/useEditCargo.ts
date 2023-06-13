import { CargoApi } from '@/api/cargo/CargoApi'
import { queryClient } from '@/provider/ReactQueryProvider'
import { useMutation } from 'react-query'

export const useEditCargo = ({ groupId }: { groupId: string }) => {
  return useMutation('editCargo', CargoApi.editCargo, {
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ['getCargo', groupId],
        refetchInactive: true
      })
    }
  })
}

import { CargoApi } from '@/api/cargo/CargoApi'
import { queryClient } from '@/provider/ReactQueryProvider'
import { useMutation } from 'react-query'

export const useCreateCargo = ({ groupId }: { groupId: string }) => {
  return useMutation('createCargo', CargoApi.createCargo, {
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ['getCargo', groupId],
        refetchInactive: true
      })
    }
  })
}

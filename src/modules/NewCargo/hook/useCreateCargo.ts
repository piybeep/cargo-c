import { CargoApi } from '@/api/cargo/CargoApi'
import { queryClient } from '@/provider/ReactQueryProvider'
import { useMutation } from 'react-query'

///доделать
export const useCreateCargo = ({ groupId }: { groupId: string }) => {
  return useMutation('createCargo', CargoApi.createCargo, {
    onSuccess(data) {
      console.log(groupId)
      queryClient.invalidateQueries({
        queryKey: ['getCargo', groupId],
        refetchInactive: true
      })
    }
  })
}

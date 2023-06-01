import { CargoApi } from '@/api/cargo/CargoApi'
import { queryClient } from '@/provider/ReactQueryProvider'
import { useMutation } from 'react-query'

export const useRemoveCargo = ({ groupId }: { groupId: string }) => {
  return useMutation(['removeCargo'], CargoApi.removeCargo, {
    onSuccess() {
      queryClient.invalidateQueries(['getCargo', groupId])
    }
  })
}

import { CargoApi } from '@/api/cargo/CargoApi'
import { useQuery } from 'react-query'

export const useGetAllCargo = ({
  groupId,
  templates
}: {
  groupId: string
  templates: boolean
}) => {
  return useQuery(
    ['getCargo', groupId,templates],
    async () => await CargoApi.getAllCargo({ groupId, templates })
  )
}

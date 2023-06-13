import { CargoApi } from '@/api/cargo/CargoApi'
import { cargoEntity } from '@/api/cargo/type'
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
    async () => await CargoApi.getAllCargo<cargoEntity[]>({ groupId, templates })
  )
}

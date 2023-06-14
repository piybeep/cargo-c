import { CargoApi } from '@/api/cargo/CargoApi'
import { cargoEntity } from '@/api/cargo/type'
import { useQuery } from 'react-query'

export const useGetAllCargo = ({ groupId }: { groupId: string }) => {
  return useQuery(
    ['getCargo', groupId, false],
    async () =>
      await CargoApi.getAllCargo<cargoEntity[]>({ groupId, templates: false })
  )
}

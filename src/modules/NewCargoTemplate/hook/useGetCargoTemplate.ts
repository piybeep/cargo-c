import { CargoApi } from '@/api/cargo/CargoApi'
import { cargoEntity } from '@/api/cargo/type'
import { useInfiniteQuery } from 'react-query'

export const useGetCargoTemplate = ({ groupId }: { groupId: string }) => {
  return useInfiniteQuery(
    ['getCargoTemplate', groupId, true],
    async ({ pageParam = 0 }) =>
      await CargoApi.getAllCargo<{
        data: cargoEntity[]
        page: number
        itemCount: number
        pageCount: number
      }>({ groupId, templates: true, page: pageParam }),
    {
      getNextPageParam: (page, prevPage) => {
        if (page.data && page.data.length > 0) {
          return (page.page + 1) as number
        }
      },
      keepPreviousData: true
    }
  )
}

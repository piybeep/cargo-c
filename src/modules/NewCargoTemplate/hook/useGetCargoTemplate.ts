import { CargoApi } from '@/api/cargo/CargoApi'
import { cargoEntity } from '@/api/cargo/type'
import { useInfiniteQuery } from 'react-query'

export const useGetCargoTemplate = ({
  groupId,
  templates
}: {
  groupId: string
  templates: boolean
}) => {
  return useInfiniteQuery(
    ['getCargoTemplate', groupId, templates],
    async ({ pageParam = 0 }) =>
      await CargoApi.getAllCargo<{
        data: cargoEntity[]
        page: number
        itemCount: number
        pageCount: number
      }>({ groupId, templates, page: pageParam }),
    {
      getNextPageParam: (page, prevPage) => {
        if (page.data && page.data.length > 0) {
          return page.page + 1 as number
        }
      },
      keepPreviousData: true
    }
  )
}

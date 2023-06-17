import { TransportApi } from '@/api/transport/TransportApi'
import { useInfiniteQuery } from 'react-query'

export const useGetTransportTemplate = () => {
  return useInfiniteQuery(
    'getTransportTemplate',
    ({ pageParam = 0 }) =>
      TransportApi.getAllTransport({ tmp: true, size: 10, page: pageParam }),
    {
      getNextPageParam: (page, prevPage) => {
        if (page.data && page.data.length > 0) {
          return Number(page.page) + 1
        }
      },
      keepPreviousData: true
    }
  )
}

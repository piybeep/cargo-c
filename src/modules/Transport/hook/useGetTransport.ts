import { TransportApi } from '@/api/transport/TransportApi'
import { useInfiniteQuery } from 'react-query'

export const useGetTransport = ({ tmp }: { tmp: boolean }) => {
  return useInfiniteQuery(
    'getTransport',
    ({ pageParam=0 }) => TransportApi.getAllTransport({ page: pageParam, tmp }),
    {
      getNextPageParam: (page, prevPage) => {
        if (page.data && page.data.length > 0) {
          return page.page + 1
        }
      },
      keepPreviousData: true
    }
  )
}

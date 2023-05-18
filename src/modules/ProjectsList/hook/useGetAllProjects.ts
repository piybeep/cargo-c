import { ProjectsApi } from '@/api/projects/ProjectsApi'
import { useInfiniteQuery } from 'react-query'

interface useGetAllProjectsProps {
  searchString: string | null
  sortDirection: string
  sortField: string
  userId: string
}

export const useGetAllProjects = (data: useGetAllProjectsProps) => {
  return useInfiniteQuery(
    ['getAllProjects', data.searchString, data.sortDirection, data.sortField],
    ({ pageParam = 0 }) =>
      ProjectsApi.getAllProjects({
        page: pageParam,
        ...data
      }),
    {
      getNextPageParam: (page,prevPage) => {
        if (page.data && page.data.length > 0) {
          // return page.page + 1
          //переделать
          return 1
        }
      },
      keepPreviousData: true
    }
  )
}

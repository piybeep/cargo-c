import { groupsApi } from '@/api/groups/groupsApi'
import { useQuery } from 'react-query'

export const useGetGroups = ({
  projectId,
  searchString
}: {
  projectId: string|null
  searchString: string | null
}) => {
  return useQuery(['getGroups', projectId, searchString], () =>{
    if(projectId){
        return groupsApi.getAllGroups({ projectId, searchString })
    }else{
        return Promise.reject()
    }
  }
  )
}

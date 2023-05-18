import { ProjectsApi } from '@/api/projects/ProjectsApi'
import { queryClient } from '@/provider/ReactQueryProvider'
import { useMutation } from 'react-query'

export const useUpdateProjcet = () => {
  return useMutation('updateProject', ProjectsApi.updateProject,{
    onSuccess(){
        queryClient.invalidateQueries('getAllProjects')
    }
  })
}

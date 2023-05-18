import { ProjectsApi } from '@/api/projects/ProjectsApi'
import { queryClient } from '@/provider/ReactQueryProvider'
import { useMutation } from 'react-query'

export const useCreateProject = () => {
  return useMutation('createProject', ProjectsApi.createProject,{
    onSuccess(){
        queryClient.invalidateQueries('getAllProjects')
    }
  })
}

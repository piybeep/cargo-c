import { ProjectsApi } from "@/api/projects/ProjectsApi"
import { queryClient } from "@/provider/ReactQueryProvider"
import { useMutation } from "react-query"

export const useRemoveProject=()=>{
    return useMutation('removeProject',ProjectsApi.removeProject,{
        onSuccess(){
            queryClient.invalidateQueries('getAllProjects')
        }
    })
}
import { groupsApi } from "@/api/groups/groupsApi"
import { queryClient } from "@/provider/ReactQueryProvider"
import { useMutation } from "react-query"

export const useCreateGroup=()=>{
    return useMutation('createGroup',groupsApi.createGroup,{
        onSuccess(){
            queryClient.invalidateQueries('getGroups')
        }
    })
}
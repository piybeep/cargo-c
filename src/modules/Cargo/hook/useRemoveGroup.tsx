import { groupsApi } from '@/api/groups/groupsApi'
import { queryClient } from '@/provider/ReactQueryProvider'
import { useMutation } from 'react-query'

export const useRemoveGroup = ({ projectId }: { projectId: string | null }) => {
  return useMutation('removeGroup', groupsApi.removeGroup, {
    onSuccess() {
      queryClient.invalidateQueries(['getGroups', projectId])
    }
  })
}

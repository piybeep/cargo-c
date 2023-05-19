import { groupsApi } from '@/api/groups/groupsApi'
import { useMutation } from 'react-query'

export const useEditGroup = () => {
  return useMutation('editGroup', groupsApi.editGroup)
}

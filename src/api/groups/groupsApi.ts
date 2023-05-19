import { instance } from '..'
import { editGroupProps, getAllGroupsProps, groupEntity } from './type'

export const groupsApi = {
  async getAllGroups({ projectId, searchString }: getAllGroupsProps) {
    console.log(searchString)
    const res = await instance.get<groupEntity[]>(
      `projects/${projectId}/groups${
        searchString != '' ? '?searchString=' + searchString : ''
      }`
    )
    return res.data
  },
  async createGroup({ projectId }: { projectId: string }) {
    const res = await instance.post<groupEntity[]>(
      `projects/${projectId}/groups`
    )
    return res.data
  },
  async editGroup({ groupId, projectId, data }: editGroupProps) {
    const res = await instance.put(
      `projects/${projectId}/groups/${groupId}`,
      data
    )
    return res.data
  }
}

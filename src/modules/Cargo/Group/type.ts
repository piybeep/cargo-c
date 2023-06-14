import { editGroupProps, groupEntity } from "@/api/groups/type"
import { UseMutateAsyncFunction } from "react-query"

export interface GroupProps {
  group: groupEntity
  indGroup: number
  editGroup: UseMutateAsyncFunction<any, unknown, editGroupProps, unknown>
  removeGroupHandle: (groupId: string) => Promise<void>
  isLoadingRemove: boolean
}

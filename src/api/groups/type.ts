export interface getAllGroupsProps {
  projectId: string
  searchString: string | null
}

export interface groupEntity {
  id: string
  name: string
  projectId: string
  position: number
  hide: boolean
  updatedAt: string
  createdAt: string
}

export interface editGroupProps {
  projectId: string
  groupId: string
  data?: {
    name?: string
    hide?: boolean
    position?: number
  }
}

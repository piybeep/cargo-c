export interface getAllProjectsProps {
  page: number
  searchString: string | null
  sortField: string
  sortDirection: string
  userId: string
}

export interface getAllProjectsPropsRes {
  data: projectEntity[]
  count: number
  page: number
}

export interface projectEntity {
  id: string
  name: string
  userId: string
  updatedAt: string
  createdAt: string
}

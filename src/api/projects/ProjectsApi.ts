import { makeQueryParam } from '@/utils/makeQueryParam'
import { instance } from '..'
import { getAllProjectsProps, getAllProjectsPropsRes, projectEntity } from './type'

export const ProjectsApi = {
  async getAllProjects(data: getAllProjectsProps) {
    const query = makeQueryParam(data)
    const res = await instance.get<getAllProjectsPropsRes>(
      `projects?${query}size=10`
    )
    return res.data
  },
  async createProject(data: { name: string; userId: string }) {
    const res = await instance.post<projectEntity>('projects', data)
    return res.data
  },
  async updateProject(data: { name: string; userId: string; id: string }) {
    const { id, ...newData } = data
    const res = await instance.put(`projects/${id}`, newData)
    return res.data
  },
  async removeProject({ id }: { id: string }) {
    const res = await instance.delete(`projects/${id}`)
    return res.data
  }
}

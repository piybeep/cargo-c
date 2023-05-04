import instance from "./index";

export const ProjectsAPI = {
    async getAllProjects(sortProjects: any) {
        return instance.get(`projects/all?${sortProjects.searchString != '' ? `searchString=${sortProjects.searchString}` : ''}&sortField=${sortProjects.sortField}&sortDirection=${sortProjects.sortDirection}`)
    }
}
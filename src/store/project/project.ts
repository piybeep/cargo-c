import { create } from "zustand";
import { projectsProps } from "./project.types";

export const useProjects = create<projectsProps>()(set => ({
    projects: [
        { id: 0, title: "Тестовый проект №1", date: "Добавлено 23.03.2023, обновлено 25.03.2023", },
        { id: 1, title: "Проект 2", date: "Добавлено 23.03.2023, обновлено 25.03.2023", },
        { id: 2, title: "Проект 3", date: "Добавлено 23.03.2023, обновлено 25.03.2023", },
    ],
    selectProject: null,
    // sortProjects: { text: '', sortUp: 0, sortType: 0 },
    setSelectProject: (id) => set(state => {
        const currentProject = state.projects.find(current => current.id === id)

        return { selectProject: currentProject }
    }),
    setAddProject: (data) => set(state => {
        const newProject = { id: state.projects.length, title: data.title, date: data.date }

        return { projects: [...state.projects, newProject] }
    }),
    setRemoveProject: (id) => set(state => {
        return { projects: state.projects.filter(current => current.id != id) }
    }),
    setCopyProject: (data) => set(state => {
        const copyProject = { id: state.projects.length, title: data.title, date: data.date }

        return { projects: [...state.projects, copyProject] }
    }),
    setEditProject: (id, title) => set(state => {
        return { projects: state.projects.map(item => item.id == id ?? item.title != title ? { ...item, title: title } : item) }
    }),
    // setEditSortType: (value) => set(state => {
    //     return { sortProjects: { ...state.sortProjects, sortType: value } }
    // }),
    // setEditSortText: (value) => set(state => {
    //     return { sortProjects: { ...state.sortProjects, text: value } }
    // }),
    // setEditSortUp: (value) => set(state => {
    //     return { sortProjects: { ...state.sortProjects, sortUp: value } }
    // })
}))
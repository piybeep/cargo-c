import { create } from "zustand";

export const useProjects = create(set => ({
    projects: [
        { id: 0, title: "Тестовый проект №1", date: "Добавлено 23.03.2023, обновлено 25.03.2023", },
        { id: 1, title: "Проект 2", date: "Добавлено 23.03.2023, обновлено 25.03.2023", },
    ],
    selectProject: '',
    useSelectProject: (id) => set(state => {
        const currentProject = state.projects.find(current => current.id === id)

        return {selectProject: [currentProject]}
    }),
    loading: false,
    error: null,
    useAddProject: (data) => set(state => {
        const newProject = { id: state.projects.length, title: data.title, date: data.date }

        return { projects: [...state.projects, newProject] }
    }),
    useRemoveProject: (id) => set(state => {
        return { projects: state.projects.filter(current => current.id != id) }
    }),
    useCopyProject: (data) => set(state => {
        const copyProject = { id: state.projects.length, title: data.title, date: data.date }

        return { projects: [...state.projects, copyProject] }
    }),
    useEditProject: (id, title) => set(state => {
        return { projects: state.projects.map(item => item.id == id ?? item.title != title ? { ...item, title: title } : item) }
    })

}))
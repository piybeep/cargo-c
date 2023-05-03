interface projectElement {
    id: number,
    title: string,
    date: string,
}

export interface projectsProps {
    projects: projectElement[],
    selectProject: null | projectElement,
    setSelectProject: (id: number) => void,
    setAddProject: (data: any) => void,
    setRemoveProject: (id: number) => void,
    setCopyProject: (data: any) => void,
    setEditProject: (id: number, title: string) => void,
    // sortProjects: {
    //     text: string,
    //     sortUp: number,
    //     sortType: number,
    // }
    // setEditSortType: (value: number) => void,
    // setEditSortText: (value: string) => void,
    // setEditSortUp: (id: number) => void,
}
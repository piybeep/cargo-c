import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ProjectStore {
  selectProject: {
    name: string
    id: string
  } | null
  setSelectProject: (selectProject: { name: string; id: string } | null) => void
}

export const useProjectStore = create<ProjectStore>()(
  devtools(
    persist(
      (set) => ({
        selectProject: null,
        setSelectProject(selectProject) {
          set({ selectProject })
        }
      }),
      {
        name: 'projectStore'
      }
    )
  )
)

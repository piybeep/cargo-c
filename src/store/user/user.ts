import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface userState {
  id: string | null
  email: string | null
  setUser: ({ id, email }: { id: string | null; email: string | null }) => void
}

export const useUserStore = create<userState>()(
  devtools(
    persist(
      (set) => ({
        id: null,
        email: null,
        setUser: ({ email, id }) => set({ email, id })
      }),
      {
        name: 'userStore'
      }
    )
  )
)

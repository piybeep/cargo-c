import { AuthApi } from '@/api/auth/AuthApi'
import { useUserStore } from '@/store/user'
import { useRouter } from 'next/router'
import React, { PropsWithChildren, useEffect, useState } from 'react'

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const [init, setInit] = useState(false)
  const { setUser, id } = useUserStore()

  const refresh = async () => {
    if (id) {
      try {
        await AuthApi.refresh()
        setInit(true)
      } catch (e) {
        if (router.pathname !== '/login' && router.pathname !== '/recovery') {
          router.push('/login')
        }
        setInit(true)
        setUser({ email: null, id: null })
      }
    } else {
      if (router.pathname !== '/login' && router.pathname !== '/recovery') {
        router.push('/login').then(() => {
          setInit(true)
        })
      } else {
        setInit(true)
      }
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  if (!init) return <></>
  return <>{children}</>
}

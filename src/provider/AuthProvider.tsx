import { AuthApi } from '@/api/auth/AuthApi'
import { useUserStore } from '@/store/user'
import { useRouter } from 'next/router'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { useQuery } from 'react-query'

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const [init, setInit] = useState(false)
  const { id, setUser } = useUserStore()
  const { data, isLoading } = useQuery('refresh', AuthApi.refresh, {
    async onError() {
      await router.push('/login')
      setInit(true)
      setUser({ email: null, id: null })
    }
  })

  useEffect(() => {
    if (!id && !isLoading) {
      if (router.pathname !== '/login' && router.pathname !== '/recovery') {
        router.push('/login')
      } else {
        setInit(true)
      }
    }
  }, [isLoading])
  if (isLoading || !init) return <></>
  return <>{children}</>
}

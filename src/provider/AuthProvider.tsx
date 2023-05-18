import { AuthApi } from '@/api/auth/AuthApi'
import { useUserStore } from '@/store/user'
import { useRouter } from 'next/router'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  //ПЕРЕДЕЛАТЬ
  // const router = useRouter()
  // const [init, setInit] = useState(false)
  // const { id, setUser } = useUserStore()
  // const { mutate, isLoading } = useMutation('refresh', AuthApi.refresh, {
  //   onError() {
  //     router.replace('/login').finally(() => setInit(true))
  //     setUser({ email: null, id: null })
  //   }
  // })

  // useEffect(() => {
  //   if (id) {
  //     mutate()
  //   } else {
  //     if (router.pathname !== '/login' && router.pathname !== '/recovery') {
  //       router.replace('/login').finally(() => setInit(true))
  //     } else {
  //       setInit(true)
  //     }
  //   }
  // }, [])
  // if (isLoading || !init) return <></>
  return <>{children}</>
}

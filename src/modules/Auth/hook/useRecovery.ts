import { AuthApi } from '@/api/auth/AuthApi'
import { useState } from 'react'
import { useMutation } from 'react-query'

export const useRecovery = () => {
  const [isFetched, setIsFetched] = useState(false)
  return {
    ...useMutation('recoveryPassword', AuthApi.recovery, {
      onSuccess() {
        setIsFetched(true)
      }
    }),
    isFetched,
    setIsFetched
  }
}

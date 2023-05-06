import { AuthApi } from '@/api/auth/AuthApi'
import { useUserStore } from '@/store/user'
import { useMutation } from 'react-query'

export const useLogin = () => {
  const setUser = useUserStore((state) => state.setUser)
  return useMutation('login', AuthApi.signIn, {
    onSuccess(data) {
      setUser(data)
    }
  })
}

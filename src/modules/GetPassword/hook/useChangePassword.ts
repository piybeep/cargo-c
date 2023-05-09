import { AuthApi } from '@/api/auth/AuthApi'
import { useMutation } from 'react-query'

export const useChangePassword = () => {
  return useMutation('changePasswords', AuthApi.changePas)
}

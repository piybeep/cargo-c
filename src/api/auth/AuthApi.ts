import { instance } from '../index'
import { changePasProps, signProps } from './types'

export const AuthApi = {
  async signIn(data: signProps) {
    const res = await instance.post<{user:{ id: string; email: string }}>(
      'auth/sign',
      data
    )
    return res.data
  },
  async refresh() {
    const res = await instance.get('auth/sessions')
    return res.data
  },
  async recovery({ email }: { email: string }) {
    const res = await instance.post('auth/recovery', { email })
    return res.data
  },
  async changePas({ code, email, password }: changePasProps) {
    const res = await instance.post(`auth/recovery/${code}`, {
      email,
      password
    })
    return res.data
  }
}

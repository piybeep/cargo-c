import { instance } from '../index'
import { signProps } from './types'

export const AuthApi = {
  async signIn(data: signProps) {
    const res = await instance.post<{ id: string; email: string }>(
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
  }
}

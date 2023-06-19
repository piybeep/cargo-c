import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true
})
instance.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      error.config &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const res = await axios.get(process.env.BASE_URL + 'auth/sessions')
        return instance.request(originalRequest)
      } catch (e) {
        localStorage.clear()
        document.location.replace('/login')
      }
    }
    throw error
  }
)

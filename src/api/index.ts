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
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        await axios.get(process.env.BASE_URL + 'auth/sessions')
        return instance.request(originalRequest)
      } catch (e) {
        localStorage.clear()
        window.location.href = '/login'
      }
    }
    throw error
  }
)

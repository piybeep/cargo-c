import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST,
    withCredentials: true,
});

instance.interceptors.response.use((config) => {
    return config
}, async error => {
    const originalRequest = error.config;
    if (error.response?.status == 401 && error.config && !error.config?._isRetry) {
        originalRequest._isRetry = true;
        try {
           window.location.href = '/login'
        } catch (_error) {
            throw _error;
        }
    }
    throw error;
})

export default instance
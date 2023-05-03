import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST,
    withCredentials: true,
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

export default instance
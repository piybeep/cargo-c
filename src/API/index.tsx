import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST,
    withCredentials: true,
});

instance.interceptors.response.use((config) => {
    return config
}, error => {
    console.log(error.response.status)
    if (error.response.status === 401){
        console.log('Ошибка авторизации 401')
    }
})

export default instance
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,
    withCredentials: false
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status

        if (status === 401) {
            localStorage.removeItem('accessToken')
        }

        return Promise.reject({
            status,
            message: error?.response?.data?.message,
            data: error?.response?.data
        })
    }
)

export default api
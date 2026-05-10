import api from "./axios"

const AuthService = {
    async register(payload) {
        const { data } = await api.post('/auth/register', payload)
        return data
    },
    async login(payload) {
        const { data } = await api.post('/auth/login', payload)

        if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken)
        }

        return data
    },
    async verifyOtp(payload) {
        const { data } = await api.post('/auth/verify-otp', payload)
        return data
    },
    async getMe() {
        const { data } = await api.get('/auth/me')
        return data
    },
    logout() {
        localStorage.removeItem('accessToken')
    }
}

export default AuthService
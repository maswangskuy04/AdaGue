import api from "./axios"

const MatchService = {
    async getActiveMatch() {
        const { data } = await api.get('/user/active-match')
        return data
    }
}

export default MatchService
import api from "./axios"

const ChatService = {
    async getMessages(conversationId) {
        const { data } = await api.get(`/chat/conversations/${conversationId}/messages`)
        return data
    }
}

export default ChatService
const ChatService = require("../services/chatService")

module.exports = {
    getMessages: async (req, res, next) => {
        try {
            const { conversationId } = req.params
            const messages = await ChatService.getMessages(conversationId)

            res.json(messages)
        } catch (err) {
            next(err)
        }
    }
}
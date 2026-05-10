const { Message, User } = require("../models");

class ChatService {
    static async getMessages(conversationId) {
        return Message.findAll({
            where: {
                conversationId
            },
            order: [['createdAt', 'ASC']],
            include: [
                {
                    model: User,
                    as: 'sender',
                    attributes: ['id', 'fullname']
                }
            ]
        })
    }
}

module.exports = ChatService
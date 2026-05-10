const { Op } = require("sequelize")
const { Conversation, Message } = require("../../models")

const activeReaders = new Map()

module.exports = (io, socket) => {
    socket.on('chat:join', async ({ conversationId }) => {
        if (!conversationId) return

        socket.join(conversationId)

        if (!activeReaders.has(conversationId)) {
            activeReaders.set(conversationId, new Set())
        }

        activeReaders.get(conversationId).add(socket.user.id)

        const unreadMessages = await Message.findAll({
            where: {
                conversationId,
                senderId: {
                    [Op.ne]: socket.user.id
                },
                isRead: false
            },
            attributes: ['id']
        })

        if (!unreadMessages.length) return

        const messageIds = unreadMessages.map(msg => msg.id)

        await Message.update({
            isRead: true
        }, {
            where: {
                id: messageIds
            }
        })

        socket.to(conversationId).emit('chat:read', {
            readerId: socket.user.id,
            messageId: messageIds
        })
    })

    socket.on('chat:send', async ({ conversationId, content }) => {
        if (!conversationId || !content?.trim()) return

        const readers = activeReaders.get(conversationId) || new Set()
        const isRead = readers.size > 1

        const message = await Message.create({
            conversationId,
            senderId: socket.user.id,
            content,
            isRead
        })

        io.to(conversationId).emit('chat:new', {
            id: message.id,
            content: message.content,
            senderId: message.senderId,
            createdAt: message.createdAt,
            isRead
        })

        if (isRead) {
            const readerId = [...readers].find(id => id !== socket.user.id)

            io.to(conversationId).emit('chat:read', {
                readerId,
                messageId: [message.id]
            })
        }
    })

    socket.on('chat:leave', ({ conversationId }) => {
        socket.leave(conversationId)

        const readers = activeReaders.get(conversationId)
        if (!readers) return

        readers.delete(socket.user.id)

        if (readers.size === 0) {
            activeReaders.delete(conversationId)
        }
    })

    socket.on('disconnect', () => {
        for (const [conversationId, readers] of activeReaders.entries()) {
            readers.delete(socket.user.id)

            if (readers.size === 0) {
                activeReaders.delete(conversationId)
            }
        }
    })

    socket.on('chat:typing:start', ({ conversationId }) => {
        socket.to(conversationId).emit('chat:typing:start', {
            userId: socket.user.id
        })
    })

    socket.on('chat:typing:stop', ({ conversationId }) => {
        socket.to(conversationId).emit('chat:typing:stop', {
            userId: socket.user.id
        })
    })
}

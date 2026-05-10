const { User } = require("../../models")

const userSockets = new Map()
const disconnectTimers = new Map()
const onlineUsers = new Set()

module.exports = (io, socket) => {
    const userId = socket.user.id

    socket.join(userId)

    onlineUsers.add(userId)
    io.emit('online:count', onlineUsers.size)

    if (!userSockets.has(userId)) {
        userSockets.set(userId, new Set())
    }

    userSockets.get(userId).add(socket.id)

    if (disconnectTimers.has(userId)) {
        clearTimeout(disconnectTimers.get(userId))
        disconnectTimers.delete(userId)
    }

    if (userSockets.get(userId).size === 1) {
        User.update(
            { presence: 'online' },
            { where: { id: userId } }
        )

        io.emit('presence:update', {
            userId,
            presence: 'online'
        })
    }

    socket.on('get:online:count', () => {
        socket.emit('online:count', onlineUsers.size)
    })

    socket.on('presence:get', ({ targetUserId }) => {
        const currentStatus = onlineUsers.has(targetUserId) ? 'online' : 'offline'
        socket.emit(`presence:res:${targetUserId}`, currentStatus)
    })

    socket.on('disconnect', () => {
        const sockets = userSockets.get(userId)
        if (!sockets) return

        sockets.delete(socket.id)

        if (sockets.size > 0) return

        const timer = setTimeout(async () => {
            await User.update(
                { presence: 'offline', lastSeenAt: new Date() },
                { where: { id: userId } }
            )

            onlineUsers.delete(userId)
            userSockets.delete(userId)
            disconnectTimers.delete(userId)

            io.emit('presence:update', {
                userId,
                presence: 'offline'
            })

            io.emit('online:count', onlineUsers.size)
        }, 5000)

        disconnectTimers.set(userId, timer)
    })
}
const chat = require("./handlers/chat")
const match = require("./handlers/match")
const presence = require("./handlers/presence")
const authSocket = require("./middleware/authSocket")

module.exports = (io) => {
    io.use(authSocket())

    io.on('connection', async (socket) => {
        socket.join(socket.user.id)
        presence(io, socket),
        match(io, socket),
        chat(io, socket)
        socket.on('disconnect', () => {
            socket.leave(socket.user.id)
        })
    })
}
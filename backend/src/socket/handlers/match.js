const { User } = require("../../models")
const MatchService = require("../../services/matchService")

module.exports = (io, socket) => {
    socket.on("match:start", async () => {
        try {
            const result = await MatchService.startSearching(socket.user.id)

            if (result.status === "waiting") {
                socket.emit("match:waiting", result)
                return  
            }

            const currentUser = await User.findByPk(socket.user.id)
            const partner = await User.findByPk(result.partner.id)

            socket.emit("match:found", {
                matchId: result.matchId,
                conversationId: result.conversationId,
                partner: {
                    id: partner.id,
                    fullname: partner.fullname
                }
            })

            io.to(partner.id).emit("match:found", {
                matchId: result.matchId,
                conversationId: result.conversationId,
                message: 'Partner found',
                partner: {
                    id: currentUser.id,
                    fullname: currentUser.fullname
                }
            })
        } catch (err) {
            socket.emit("match:error", { message: err.message })
        }
    })

    socket.on("match:cancel", async () => {
        const result = await MatchService.cancelSearching(socket.user.id)
        socket.emit("match:cancel", result)
    })

    socket.on("match:end", async () => {
        const result = await MatchService.endMatch(socket.user.id)
        if (!result) return

        socket.emit("match:end")
        io.to(result.partnerId).emit("match:end")
    })
}

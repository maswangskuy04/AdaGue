const verifyAuthToken = require("../../utils/verifyAuth")

module.exports = (allowedRoles = []) => {
    return (socket, next) => {
        try {
            const token = socket.handshake.auth?.accessToken

            if (!token) {
                return next(new Error("Unauthorized"))
            }

            const payload = verifyAuthToken(token)

            if (allowedRoles.length && !allowedRoles.includes(payload.roles)) {
                return next(new Error("Forbidden"))
            }

            socket.user = payload
            next()
        } catch {
            next(new Error("Invalid token"))
        }
    }
}

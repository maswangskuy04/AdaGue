const { verifyToken } = require("./jwt")

function verifyAuthToken(token) {
    if (!token) {
        throw new Error('Unauthorized')
    }

    return verifyToken(token)
}

module.exports = verifyAuthToken
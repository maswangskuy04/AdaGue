const verifyAuthToken = require("../utils/verifyAuth")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) throw { status: 401, message: 'Unauthorized' }

        req.user = verifyAuthToken(token)
        next()
    } catch {
        next({ status: 401, message: 'Invalid token' })
    }
}
const UserService = require("../services/userService")

module.exports = {
    getActiveMatch: async (req, res, next) => {
        try {
            const data = await UserService.getActiveMatch(req.user.id)

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    },
    getProfile: async (req, res, next) => {
        try {
            const data = await UserService.getProfile(req.user.id)

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
}
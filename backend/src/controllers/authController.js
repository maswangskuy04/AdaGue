const AuthService = require('../services/authService')

module.exports = {
    register: async (req, res, next) => {
        try {
            const data = await AuthService.register(req.body)
            res.status(201).json(data)
        } catch (err) {
            next(err)
        }
    },
    login: async (req, res, next) => {
        try {
            const data = await AuthService.login(req.body)
            res.json(data)
        } catch (err) {
            next(err)
        }
    },
    verifyOtp: async (req, res, next) => {
        try {
            const data = await AuthService.verifyOtp(req.body)
            res.json(data)
        } catch (err) {
            next(err)
        }
    },
    me: async (req, res, next) => {
        try {
            const user = await AuthService.me(req.user.id)
            res.json({ user })
        } catch (err) {
            next(err)
        }
    }
}
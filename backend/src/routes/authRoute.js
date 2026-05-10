const router = require('express').Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')
const loginLimiter = require('../middleware/loginLimiter')

router.post('/login', loginLimiter, authController.login)
router.post('/register', authController.register)
router.post('/verify-otp', authController.verifyOtp)
router.get('/me', authMiddleware, authController.me)

module.exports = router
const router = require('express').Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/active-match', authMiddleware, userController.getActiveMatch)
router.get('/get-profile', authMiddleware, userController.getProfile)

module.exports = router
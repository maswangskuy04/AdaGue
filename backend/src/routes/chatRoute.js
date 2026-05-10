const chatController = require('../controllers/chatController')
const authMiddleware = require('../middleware/authMiddleware')

const router = require('express').Router()

router.get('/conversations-all', authMiddleware)
router.get('/conversations/:conversationId/messages', authMiddleware, chatController.getMessages)

module.exports = router
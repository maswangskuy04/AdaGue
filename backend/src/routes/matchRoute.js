const router = require('express').Router()
const matchController = require('../controllers/matchController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, matchController.getAllMatches)

module.exports = router
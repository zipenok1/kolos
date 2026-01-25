const Router = require('express')
const router = new Router()
const feedbackController = require('../controllers/feedbackController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, feedbackController.get)
router.post('/', feedbackController.post)
router.delete('/:id', authMiddleware, feedbackController.delete)

module.exports = router
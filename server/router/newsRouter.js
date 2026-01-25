const Router = require('express')
const router = new Router()
const newsController = require('../controllers/newsController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', newsController.get)
router.post('/', authMiddleware, newsController.post)
router.put('/:id', authMiddleware, newsController.put)
router.delete('/:id', authMiddleware, newsController.delete)

module.exports = router
const Router = require('express')
const router = new Router()
const newsletterController = require('../controllers/newsletterController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, newsletterController.get)
router.post('/', newsletterController.post)
router.delete('/:id', authMiddleware, newsletterController.delete)

module.exports = router
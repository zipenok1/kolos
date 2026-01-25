const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', productController.get)
router.post('/', authMiddleware, productController.post)
router.put('/:id', authMiddleware, productController.put)
router.delete('/:id', authMiddleware, productController.delete)

module.exports = router
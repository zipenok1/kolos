const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', productController.get)
router.get('/:id', productController.getByCatalog)
router.post('/', authMiddleware, productController.post)
router.put('/:id', authMiddleware, productController.update)
router.delete('/:id', authMiddleware, productController.delete)

module.exports = router
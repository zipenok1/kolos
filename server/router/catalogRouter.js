const Router = require('express')
const router = new Router()
const catalogController = require('../controllers/catalogController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', catalogController.get)
router.post('/', authMiddleware, catalogController.post)
router.put('/:id', authMiddleware, catalogController.put)

module.exports = router
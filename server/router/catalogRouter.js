const Router = require('express')
const router = new Router()
const catalogController = require('../controllers/catalogController')

router.get('/', catalogController.get)
router.post('/', catalogController.post)
router.put('/:id', catalogController.put)

module.exports = router
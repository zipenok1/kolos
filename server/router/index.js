const Router = require('express')
const router = new Router()

const catalog = require('./catalogRouter')
const product = require('./productRouter')
const user = require('./userRouter')

router.use('/catalog', catalog)
router.use('/product', product)
router.use('/user', user)

module.exports = router
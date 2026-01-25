const Router = require('express')
const router = new Router()

const catalog = require('./catalogRouter')
const user = require('./userRouter')

router.use('/catalog', catalog)
router.use('/user', user)

module.exports = router
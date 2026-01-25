const Router = require('express')
const router = new Router()

const catalog = require('./catalogRouter')

router.use('/catalog', catalog)

module.exports = router
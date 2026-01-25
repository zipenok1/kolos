const Router = require('express')
const router = new Router()

const catalog = require('./catalogRouter')
const product = require('./productRouter')
const news = require('./newsRouter')
const newsletter = require('./newsletterRouter')
const feedback = require('./feedbackRouter')
const user = require('./userRouter')

router.use('/catalog', catalog)
router.use('/product', product)
router.use('/news', news)
router.use('/newsletter', newsletter)
router.use('/feedback', feedback)
router.use('/user', user)

module.exports = router
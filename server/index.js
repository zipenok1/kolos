require('dotenv').config()
const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')
const cors = require('cors')
const sequelize = require('./database')
const router = require('./router/index')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(5000, () => {console.log('start run')})
    } catch (e) {
        console.log(e);
    }
}
start()
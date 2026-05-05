const { Newsletter } = require('../models/index')
const BaseService = require('./baseService')

class NewsletterService extends BaseService{
    constructor(){
        super(Newsletter, 'id_newsletter', {isImg: true})
    }
}

module.exports = new NewsletterService() 
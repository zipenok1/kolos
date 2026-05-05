const { News } = require('../models/index');
const BaseService = require('./baseService');
 
class NewsService extends BaseService{
    constructor(){
        super(News, 'id_news', {isImg: true})
    }
}

module.exports = new NewsService()
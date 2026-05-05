const { Catalog } = require('../models/index')
const BaseService = require('./baseService')

class CatalogService extends BaseService{
    constructor(){
        super(Catalog, 'id_catalog', {isImg: true})
    }
}

module.exports = new CatalogService() 
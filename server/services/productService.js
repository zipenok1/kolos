const { Product, Catalog } = require('../models/index')
const BaseService = require('./baseService')

class ProductService extends BaseService{
    constructor(){
        super(Product, 'id_product', {isImg: true})
    }

    async getByCatalog(id){
        try{
            if (!id) throw new Error('id не указан') 
            
            const product = await Product.findAll({
                where: { id_catalog: id },
                include: [{ model: Catalog }] 
            })
            if (!product) throw new Error('запись не существует')

            return product
        } catch(e){
            throw new Error(`ошибка получения ${e.message}`)
        }
    }
}

module.exports = new ProductService() 
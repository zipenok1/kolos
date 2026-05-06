const productService = require('../services/productService')
const fileUpload = require('../utils/fileUpload')

class ProductController {
    async get(req, res){
        try{
            const product = await productService.get()
            return  res.status(200).json(product)
        } catch(e){
           return res.status(500).json({ message: e.message })
        }
    }

    async getByCatalog(req, res){
        try {
            const {id} = req.params;
            
            const product = await productService.getByCatalog(id)
            return res.status(200).json(product)
        } catch(e) {
            if (e.message.includes('не существует')) {
                return res.status(404).json({ message: e.message })
            }
            return res.status(500).json({ message: e.message })
        }
    }

    async post(req, res){
        try{
            if(!req.user) return res.status(401).json({ message: 'требуется авторизация' })

            const img = fileUpload.getFile(req)            
            const product = await productService.post(req.body, img)
            return res.status(201).json(product)
        } catch(e){
           return res.status(500).json({ message: e.message })
        }
    }

    async update(req, res){
        try{
            if(!req.user) return res.status(401).json({ message: 'требуется авторизация' })
            const {id} = req.params
            
            const img = fileUpload.getFile(req)
            const product = await productService.update(id, req.body, img)
            return res.status(200).json(product)
        } catch(e){
            if (e.message.includes('не существует')) {
                return res.status(404).json({ message: e.message })
            }
            return res.status(500).json({ message: e.message })
        }
    }

    async delete(req, res){
        try{
            if(!req.user) return res.status(401).json({ message: 'требуется авторизация' })
            const {id} = req.params

            const product = await productService.delete(id)
            return res.status(200).json({ message: product.message, id: product.id })
        } catch(e) {
            if (e.message.includes('не существует')) {
                return res.status(404).json({ message: e.message })
            }
            return res.status(500).json({ message: e.message })
        }
    }
}

module.exports = new ProductController()
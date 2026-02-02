const { Product, Catalog } = require('../models/index')
const FileService = require('../services/fileService')

class ProductController {
    async get(req, res){
        try{
            const product = await Product.findAll() 
            return  res.status(200).json(product)
        } catch(e){
            return res.status(500).json({ 
                message: `ошибка получения ${e}` 
            })
        }
    }

    async getByCatalog(req, res){
      try {
        const {id} = req.params;
        if (!id) return res.status(400).json('id не указан')
        
        const product = await Product.findAll({
            where: { id_catalog: id },
            include: [{ model: Catalog }] 
        })
        
        if (!product) return res.status(404).json('не найден')
        
        return res.status(200).json(product)
    } catch(e) {
        return res.status(500).json({ 
            message: `ошибка получения: ${e.message}` 
        });
    }
    }

    async post(req, res){
        try{
            if(!req.user) return res.status(401).json({ message: 'требуеться авторизация' })

            const {name, description, id_catalog} = req.body
            const img = FileService.getFile(req)

            const fileName = await FileService.saveFile(img)
            
            const product = await Product.create({
                name, 
                description,
                id_catalog,
                img: fileName
            })

            return res.json(product)
        } catch(e){
            return res.status(400).json({ 
                message: e.message  
            })
        }
    }

    async put(req, res){
        try{
            if(!req.user) return res.status(401).json({ message: 'требуеться авторизация' })
                
            const {id} = req.params
            const {name, description, id_catalog} = req.body
            const img = FileService.getFile(req)

            if(!id) return res.status(400).json('не существует')

            const product = await Product.findOne({where: { id_product: id }})
            if(!product) return res.status(400).json('не существует')

            let fileName = product.img
            if (img) {
                fileName = await FileService.saveFile(img)
            }

            await product.update({
                name: name,
                description: description,
                id_catalog: id_catalog,
                img: fileName
            })

            return res.status(200).json({ message: 'записть ' + id + ' обновлена'})
        } catch(e){
            return res.status(500).json({ 
                message: `ошибка обновления ${e}`
            })
        }
    }

    async delete(req, res){
        try{
            const {id} = req.params
            if(!id) return res.status(400).json('такого элемента не существует')

            const product = await Product.findOne({ where: { id_product: id } });
            if (!product) return res.status(400).json('такого элемента не существует')

            await Product.destroy({ where:{ id_product: id } })

            return res.json({ message: 'записть ' + id + ' удалена'})
        } catch(e) {
            return res.status(500).json({ 
                message: `ошибка удаления ${e}`
            })
        }
    }
}

module.exports = new ProductController()
const { Catalog } = require('../models/index')
const FileService = require('../services/fileService')

class CatalogController {
    async get(req, res){
        try{
            const catalog = await Catalog.findAll() 
            return res.status(200).json(catalog)
        } catch(e){
            return res.status(500).json({ 
                message: `ошибка получения ${e}` 
            })
        }
    }

    async post(req, res){
        try{
            if(!req.user) return res.status(401).json({ message: 'требуеться авторизация' })

            const {name} = req.body
            const img = FileService.getFile(req)

            const fileName = await FileService.saveFile(img)
            
            const catalog = await Catalog.create({
                name, 
                img: fileName
            })

            return res.json(catalog)
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
            const {name} = req.body
            const img = FileService.getFile(req)

            if(!id) return res.status(400).json('не существует')

            const catalog = await Catalog.findOne({where: { id_catalog: id }})
            if(!catalog) return res.status(400).json('не существует')
            
            let fileName = catalog.img
            if (img) {
                fileName = await FileService.saveFile(img)
            }

            await catalog.update({
                name: name,
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
            if(!req.user) return res.status(401).json({ message: 'требуеться авторизация' })
            const {id} = req.params 

            const catalog = await Catalog.findOne({ where: { id_catalog: id } })
            if(!catalog) return res.status(400).json('такого элемента не существует')

            await Catalog.destroy({ where:{ id_catalog: id } })

            return res.json({ message: 'записть ' + id + ' удалена'})
        } catch(e){
            return res.status(500).json({ 
                message: `ошибка удалена ${e}`
            })
        }
    }
}

module.exports = new CatalogController()
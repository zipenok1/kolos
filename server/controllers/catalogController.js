const catalogService = require('../services/catalogService')
const fileUpload = require('../utils/fileUpload')

class CatalogController {
    async get(req, res){
        try{
            const catalog = await catalogService.get()
            return res.status(200).json(catalog)
        } catch(e){
           return res.status(500).json({ message: e.message })
        }
    }

    async post(req, res){
        try{
            if(!req.user) return res.status(401).json({ message: 'требуется авторизация' })

            const img = fileUpload.getFile(req)
            const catalog = await catalogService.post(req.body, img)
            return res.status(201).json(catalog)
        } catch(e){
           return res.status(500).json({ message: e.message })
        }
    }

    async update(req, res) {
        try {
            if (!req.user) return res.status(401).json({ message: 'требуется авторизация' })
            const {id} = req.params
        
            const img = fileUpload.getFile(req)
            const catalog = await catalogService.update(id, req.body, img)
            return res.status(200).json(catalog)
        } catch(e) {
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

            const catalog = await catalogService.delete(id)
            return res.status(200).json({ message: catalog.message, id: catalog.id })
        } catch(e){
            if (e.message.includes('не существует')) {
                return res.status(404).json({ message: e.message })
            }
            return res.status(500).json({ message: e.message })
        }
    }
}

module.exports = new CatalogController()
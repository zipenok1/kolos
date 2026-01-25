const { Catalog } = require('../models/index')
const fileFormat = require('../utils/fileFormat')
const uuid = require("uuid")
const path = require('path')

class CatalogController{
    async get(req, res){
        try{
            const catalog = await Catalog.findAll() 
            return res.status(200).json(catalog)
        } catch(e){
            return res.status(500).json({ 
                message: 'Ошибка получения каталогов' 
            })
        }
    }

    async post(req, res){
        try{
            const {name} = req.body
            const {img} = req.files

            const fileExtension = fileFormat(img)
            const fileName = uuid.v4() + '.' + fileExtension;
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            
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
}

module.exports = new CatalogController()
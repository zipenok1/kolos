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
                message: `ошибка получения ${e}` 
            })
        }
    }

    async post(req, res){
        try{
            const {name} = req.body
            const {img} = req.files

            const fileExtension = fileFormat(img)
            const fileName = uuid.v4() + '.' + fileExtension
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

    async put(req, res){
        try{
            const {id} = req.params
            const {name} = req.body

            let fileName 
            if(req.files !== null){
                const {img} = req.files
                const fileExtension = fileFormat(img)
                fileName = uuid.v4() + '.' + fileExtension
                await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            }

            if(!id) return res.status(400).json('не существует')

            const catalog = await Catalog.findOne({where: { id_catalog: id }})

            if(!catalog) return res.status(400).json('не существует')

            if(req.files === null){
                await Catalog.update(
                    {name: name},
                    {where:{ id_catalog: id }}
                )
            }else{
                await Catalog.update(
                    {name: name, img: fileName},
                    {where:{id_catalog: id}}
                )
            }

            return res.status(200).json({ message: 'записть ' + id + ' обновлена'})
        } catch(e){
            return res.status(500).json({ 
                message: `ошибка обновления ${e}`
            })
        }
    }
}

module.exports = new CatalogController()
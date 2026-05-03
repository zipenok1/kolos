const { Catalog } = require('../models/index')
const FileUpload = require('../utils/fileUpload')

class CatalogService {
    async get(){
        try{
            return await Catalog.findAll()
        } catch(e){
            throw new Error(`ошибка получения ${e.message}` )
        }
    }

    async post(data, img){
        try{
            const { name } = data
            let fileName = null
            if (img) fileName = await FileUpload.saveFile(img)
        
            return await Catalog.create({
                name,
                img: fileName
            })

        } catch(e){
            throw new Error(`ошибка добавления ${e.message}`)
        }
    }

    async update(id, data, img) {
        try{
            if (!id) throw new Error('id не указан')
            
            const { name } = data
            
            const catalog = await Catalog.findOne({ where: { id_catalog: id } })
            if (!catalog) throw new Error('запись не существует')
            
            let fileName = catalog.img
            if (img) fileName = await FileUpload.saveFile(img)
            
            await catalog.update({
                name: name,
                img: fileName
            })
            
            return { 
                id: id,
                name: name,
                img: fileName
            }
        } catch(e){
            throw new Error(`ошибка обновления ${e.message}`)
        }
    }

    async delete(id){
        try{
            if (!id) throw new Error('id не указан')
        
            const catalog = await Catalog.findOne({ where: { id_catalog: id } })
            if (!catalog) throw new Error('запись не существует')

            await Catalog.destroy({ where:{ id_catalog: id } })

            return { 
                message: `запись ${id} удалена`,
                id: id 
            }
        } catch(e){
            throw new Error(`ошибка удаления ${e.message}`)
        }
    }
}

module.exports = new CatalogService() 
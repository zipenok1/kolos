const FileUpload = require('../utils/fileUpload')

class BaseService {
    constructor(model, idField, config = {}){
        this.model = model
        this.idField = idField
        this.isImg = config.isImg || false
    }

    async get() {
        try {
            return await this.model.findAll()
        } catch(e) {
            throw new Error(`ошибка получения ${e.message}`)
        }
    }

    async getById(id) {
        try {
            if (!id) throw new Error('id не указан')
            
            const where = {}
            where[this.idField] = id
            
            const item = await this.model.findOne({ where })
            if (!item) throw new Error('запись не существует')
            
            return item
        } catch(e) {
            throw new Error(`ошибка получения ${e.message}`)
        }
    }

    async post(data, img) {
        try {
            let createData = { ...data }
            
            if (this.isImg && img) {
                createData.img = await FileUpload.saveFile(img)
            }
        
            return await this.model.create(createData)
        } catch(e) {
            throw new Error(`ошибка добавления ${e.message}`)
        }
    }

    async update(id, data, img) {
        try {
            if (!id) throw new Error('id не указан')
            
            const where = {}
            where[this.idField] = id
            
            const item = await this.model.findOne({ where })
            if (!item) throw new Error('запись не существует')
            
            let updateData = { ...data }
            
            if (this.isImg) {
                if (img) {
                    updateData.img = await FileUpload.saveFile(img)
                } else if (data.img === null) {
                    updateData.img = null
                }
            }
            
            await item.update(updateData)
            
            return { 
                id: id,
                ...updateData
            }
        } catch(e) {
            throw new Error(`ошибка обновления ${e.message}`)
        }
    }

    async delete(id) {
        try {
            if (!id) throw new Error('id не указан')
            
            const where = {}
            where[this.idField] = id
            
            const item = await this.model.findOne({ where })
            if (!item) throw new Error('запись не существует')

            await this.model.destroy({ where })
            
            return { 
                message: `запись ${id} удалена`,
                id: id 
            }
        } catch(e) {
            throw new Error(`ошибка удаления ${e.message}`)
        }
    }
}

module.exports = BaseService
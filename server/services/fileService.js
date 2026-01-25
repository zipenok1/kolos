const uuid = require('uuid')
const path = require('path')
const fileFormat = require('../utils/fileFormat')

class FileService {
    static async saveFile(img) {
        if (!img) return null
        
        try {
            const extension = fileFormat(img)
            const fileName = uuid.v4() + '.' + extension
            const filePath = path.resolve(__dirname, '..', 'static', fileName)
            
            await img.mv(filePath)
            return fileName
            
        } catch (e) {
            throw new Error(`ошибка загрузки файла: ${e.message}`)
        }
    }
    
    static getFile(req) {
        return req.files?.img || null
    }
}

module.exports = FileService
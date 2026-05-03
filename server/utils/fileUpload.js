const uuid = require('uuid')
const path = require('path')
const fileFormat = require('./fileFormat')

class FileUpload {
    static getFile(req) {
        return req.files?.img || null
    }

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
}

module.exports = FileUpload
const { News } = require('../models/index')
const FileService = require('../services/fileService')

class NewsController {
    async get(req, res){
        try{
            const news = await News.findAll() 
            return  res.status(200).json(news)
        } catch(e){
            return res.status(500).json({ 
                message: `ошибка получения ${e}` 
            })
        }
    }

    async getById(req, res){
        try{
            const {id} = req.params
            if(!id) return res.status(400).json('такого элемента не существует')
                
            const news = await News.findOne({where: { id_news: id }})
            if(!news) return res.status(400).json('не существует')
            
            return res.status(200).json(news)
        } catch(e){
            return res.status(500).json({ 
                message: `ошибка получения ${e}` 
            })
        }
    }    

    async post(req, res){
        try{
            if(!req.user) return res.status(401).json({ message: 'требуеться авторизация' })

            const {name, description, date} = req.body
            const img = FileService.getFile(req)

            const fileName = await FileService.saveFile(img)
            
            const news = await News.create({
                name, 
                description,
                date,
                img: fileName
            })

            return res.json(news)
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
            if(!id) return res.status(400).json('не существует')
                
            const {name, description, date} = req.body
            const img = FileService.getFile(req)

            const news = await News.findOne({where: { id_news: id }})
            if(!news) return res.status(400).json('не существует')

            let fileName = news.img
            if (img) {
                fileName = await FileService.saveFile(img)
            }

            await news.update({
                name: name,
                description: description,
                date: date,
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

            const news = await News.findOne({ where: { id_news: id } });
            if (!news) return res.status(400).json('такого элемента не существует')

            await News.destroy({ where:{ id_news: id } })

            return res.json({ message: 'записть ' + id + ' удалена'})
        } catch(e) {
            return res.status(500).json({ 
                message: `ошибка удаления ${e}`
            })
        }
    }
}

module.exports = new NewsController()
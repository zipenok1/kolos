const newsService = require('../services/newsService')
const fileUpload = require('../utils/fileUpload')

class NewsController {
    async get(req, res){
        try{
            const news = await newsService.get() 
            return res.status(200).json(news)
        } catch(e){
           return res.status(500).json({ message: e.message })
        }
    }

    async getById(req, res){
        try{
            const {id} = req.params
                
            const news = await newsService.getById(id)
            
            return res.status(200).json(news)
        } catch(e){
           return res.status(500).json({ message: e.message })
        }
    }    

    async post(req, res){
        try{
            if(!req.user) return res.status(401).json({ message: 'требуеться авторизация' })

            const img = fileUpload.getFile(req)
            const news = await newsService.post(req.body, img)
            return res.status(201).json(news)
        } catch(e){
           return res.status(500).json({ message: e.message })
        }
    }

    async update(req, res){
        try{
            if(!req.user) return res.status(401).json({ message: 'требуеться авторизация' })
            const {id} = req.params
                
            const {name, description, date} = req.body
            const img = fileUpload.getFile(req)

            const news = await newsService.update(id, req.body, img)
            return res.status(200).json(news)
        } catch(e){
            if (e.message.includes('не существует')) {
                return res.status(404).json({ message: e.message })
            }
            return res.status(500).json({ message: e.message })
        }
    }

    async delete(req, res){
        try{
            if(!req.user) return res.status(401).json({ message: 'требуеться авторизация' })
            const {id} = req.params

            const news = await newsService.delete(id)
            return res.status(200).json({ message: news.message, id: news.id })
        } catch(e) {
            if (e.message.includes('не существует')) {
                return res.status(404).json({ message: e.message })
            }
            return res.status(500).json({ message: e.message })
        }
    }
}

module.exports = new NewsController()
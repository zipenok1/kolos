const newsletterService = require('../services/newsletterService')

class NewsletterController {
    async get(req, res){
        try{
            if(!req.user) return res.status(401).json({ message: 'требуется авторизация' })

            const newsletter = await newsletterService.get()
            return  res.status(200).json(newsletter)
        } catch(e){
           return res.status(500).json({ message: e.message })
        }
    }

    async post(req, res){
        try{
            const newsletter = await newsletterService.post(req.body)
            return res.status(201).json(newsletter)
        } catch(e){
           return res.status(500).json({ message: e.message })
        }
    }

    async delete(req, res){
        try{
            if(!req.user) return res.status(401).json({ message: 'требуется авторизация' })
            const {id} = req.params

            const newsletter = await newsletterService.delete(id)
            return res.status(200).json({ message: newsletter.message, id: newsletter.id })
        } catch(e) {
            if (e.message.includes('не существует')) {
                return res.status(404).json({ message: e.message })
            }
            return res.status(500).json({ message: e.message })
        }
    }
}

module.exports = new NewsletterController()
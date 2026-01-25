const { Newsletter } = require('../models/index')

class NewsletterController {
    async get(req, res){
        try{
            if(!req.user) return res.status(401).json({ message: 'требуеться авторизация' })

            const newsletter = await Newsletter.findAll() 
            return  res.status(200).json(newsletter)
        } catch(e){
            return res.status(500).json({ 
                message: `ошибка получения ${e}` 
            })
        }
    }

    async post(req, res){
        try{
            const {email} = req.body
            const newsletter = await Newsletter.create({email})

            return res.json(newsletter)
        } catch(e){
            return res.status(400).json({ 
                message: e.message  
            })
        }
    }

    async delete(req, res){
        try{
            const {id} = req.params
            if(!id) return res.status(400).json('такого элемента не существует')

            const newsletter = await Newsletter.findOne({ where: { id_newsletter: id } });
            if (!newsletter) return res.status(400).json('такого элемента не существует')

            await Newsletter.destroy({ where:{ id_newsletter: id } })

            return res.json({ message: 'записть ' + id + ' удалена'})
        } catch(e) {
            return res.status(500).json({ 
                message: `ошибка удаления ${e}`
            })
        }
    }
}

module.exports = new NewsletterController()
const { Feedback } = require('../models/index')

class FeedbackController {
    async get(req, res){
        try{
            if(!req.user) return res.status(401).json({ message: 'требуеться авторизация' })

            const feedback = await Feedback.findAll() 
            return  res.status(200).json(feedback)
        } catch(e){
            return res.status(500).json({ 
                message: `ошибка получения ${e}` 
            })
        }
    }

    async post(req, res){
        try{
            const {name, phone, email, message} = req.body
            const feedback = await Feedback.create({name, phone, email, message})

            return res.json(feedback)
        } catch(e){
            return res.status(500).json({ 
                message: `ошибка добавления ${e}`
            })
        }
    }

    async delete(req, res){
        try{
            const {id} = req.params
            if(!id) return res.status(400).json('такого элемента не существует')
          

            const feedback = await Feedback.findOne({ where: { id_feedback: id } });
            if (!feedback) return res.status(400).json('такого элемента не существует')

            await Feedback.destroy({ where:{ id_feedback: id } })

            return res.json({ message: 'записть ' + id + ' удалена'})
        } catch(e) {
            return res.status(500).json({ 
                message: `ошибка удаления ${e}`
            })
        }
    }
}

module.exports = new FeedbackController()
const feedbackService = require("../services/feedbackService")

class FeedbackController {
    async get(req, res){
        try{
            if(!req.user) return res.status(401).json({ message: 'требуется авторизация' })

            const feedback = await feedbackService.get() 
            return  res.status(200).json(feedback)
        } catch(e){
           return res.status(500).json({ message: e.message })
        }
    }

    async post(req, res){
        try{
            const feedback = await feedbackService.create(req.body)
            return res.status(201).json(feedback)
        } catch(e){
           return res.status(500).json({ message: e.message })
        }
    }

    async delete(req, res){
        try{
            if(!req.user) return res.status(401).json({ message: 'требуется авторизация' })
            const {id} = req.params
          
            const feedback = await feedbackService.deleta(id);
            return res.status(200).json({ message: feedback.message, id: feedback.id })
        } catch(e) {
            if (e.message.includes('не существует')) {
                return res.status(404).json({ message: e.message })
            }
            return res.status(500).json({ message: e.message })
        }
    }
}

module.exports = new FeedbackController()
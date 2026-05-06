const userService = require('../services/userService')

class UserController {
    async registr(req, res) {  
        try{      
            const user = await userService.registr(req.body)

            return res.status(201).json({
                token: user.token,
                user: user.user
            })
        } catch(e){
            if (e.message.includes('ошибка создания')) {
                return res.status(400).json({ message: e.message })
            }
            return res.status(500).json({ message: e.message })
        } 
    }

    async login(req, res) {
        try {
            const user = await userService.login(req.body)
            
            return res.status(200).json({
                token: user.token,
                message: user.message
            })
        } catch(e) {
            if (e.message.includes('не найден') || e.message.includes('неверные данные')) {
                return res.status(401).json({ message: e.message })
            }
            return res.status(500).json({ message: e.message })
        }
    }
}

module.exports = new UserController()
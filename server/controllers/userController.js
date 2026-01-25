const { User } = require('../models/index')
const jwt = require('jsonwebtoken')
const { hashPassword, comparePassword } = require('../utils/password') 

class UserController {
    async registr(req, res) {
        const {name, password} = req.body
            
        const hashedPassword = await hashPassword(password)
        const user = await User.create({ name, password: hashedPassword }) 
        if (!user) return res.status(401).json({ message: 'ошибка создания' })

        const token = jwt.sign({ 
            id: user.id_user, 
            name: user.name 
        },
        process.env.SEKRET_KEY, 
        { expiresIn: '24h' }
        )

        return res.status(200).json({
            token,
            user: {
                id: user.id_user,
                name: user.name
            }
        })
    }

    async login(req, res){
        try{
            const {name, password} = req.body
            const user = await User.findOne({where: {name: name}})
            if(!user) return res.status(401).json({message: 'не найден'})
    
            const validPass = await comparePassword(password, user.password)
            if(!validPass) return res.status(401).json({message: 'неверные данные'})
    
            const token = jwt.sign({ 
                id: user.id_user, 
                name: user.name 
            },
            process.env.SEKRET_KEY, 
            { expiresIn: '24h' }
            )
    
            return res.status(200).json({
                token,
                message: 'успешно авторизован'
            }) 
        } catch(e){
            console.log('ошибка авторизации', e);
        }
    }
}

module.exports = new UserController()
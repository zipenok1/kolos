const { User } = require('../models/index')
const jwt = require('jsonwebtoken')
const { hashPassword, comparePassword } = require('../utils/password') 

class UserService {
    async registr(data){
        const {name, password} = data

        const hashedPassword = await hashPassword(password)
        const user = await User.create({ name, password: hashedPassword }) 
        if(!user) throw new Error('ошибка создания')

        const token = jwt.sign({ 
            id: user.id_user, 
            name: user.name 
        },
        process.env.SEKRET_KEY, 
        { expiresIn: '24h' }
        )

        return { 
            token,
            user: {
                id: user.id_user,
                name: user.name
            }
        }
    }

    async login(){
        
    }
}

module.exports = new UserService() 
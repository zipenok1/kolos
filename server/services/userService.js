const { User } = require('../models/index')
const { hashPassword, comparePassword } = require('../utils/password') 
const jwt = require('jsonwebtoken')

class UserService {
    async registr(data){
        try{
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
        } catch(e){
            throw new Error(`ошибка создания ${e.message}`)
        }

    }

    async login(data){
        try{
            const {name, password} = data

            const user = await User.findOne({where: {name: name}})
            if(!user) throw new Error('не найден')

            const validPass = await comparePassword(password, user.password)
            if(!validPass) throw new Error('неверные данные')

            const token = jwt.sign({ 
                id: user.id_user, 
                name: user.name 
            },
            process.env.SEKRET_KEY, 
            { expiresIn: '24h' }
            )

            return {
                token,
                message: 'успешно авторизован'
            }
        } catch(e){
            throw new Error(`ошибка авторизации ${e.message}`)
        }

    }
}

module.exports = new UserService() 
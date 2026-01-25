const jwt = require('jsonwebtoken') 

module.exports = function authMiddleware(req, res, next) {
    try{
        const authHeader = req.headers.authorization
        if(!authHeader) return res.status(401).json({ message: 'требуется авторизация' })
        
        const token = authHeader.replace('Bearer ', '')
        if(!token) return res.status(401).json({ message: 'неверный формат токена' })
        const decode = jwt.verify(token, process.env.SEKRET_KEY)
        
        if(!decode.id || !decode.name) return res.status(401).json({ message: 'невалидный токен' })
        req.user = decode
        next()
    } catch(e){
        return res.status(401).json({ message: 'неверный токен' })
    }
}
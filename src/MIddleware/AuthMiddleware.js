const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function authMiddleware (req, res, next) {

    const isUsu = true

    if(isUsu){
        res.status(500).json({
            response : false, mesagge: "Ok"
        })
    }else{
        req.headers.middle_usu = "ok"
        return next()
    }
}

module.exports = authMiddleware
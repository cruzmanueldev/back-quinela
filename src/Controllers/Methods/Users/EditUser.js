const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');
const crypto = require('crypto');

controller.EditUser = async ( req, res ) => {

    const {
        req_usuusuario,
        req_usucontrasenia
    } = req.body

    let message = 'Usuario editado con exito'
    let statusCode = 200
    let response = true

    try{

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req_usucontrasenia, saltRounds);
        const token = crypto.randomBytes(32).toString('hex');

        const usue = await prisma.usuusuarios.findFirst({
            where : {
                usuusuario : req_usuusuario
            }
        })

        await prisma.usuusuarios.update({
            where : {
                usuid : usue.usuid
            },
            data : {
                usucontrasenia  : hashedPassword,
                usutoken        : token
            }
        })
        
    }catch(err){
        console.log(err)
        response    = false
        message     = 'Ha ocurrido un error al editar al usuario'
        statusCode  = 500
    }finally{
        
        await prisma.$disconnect()
        return res.status(statusCode)
                .json({
                    response,
                    message
                })
    }
}

module.exports = controller
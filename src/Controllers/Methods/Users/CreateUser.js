const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');
const crypto = require('crypto');

controller.CreateUser = async ( req, res ) => {

    const {
        req_usunombre,
        req_usuusuario,
        req_usucontrasenia
    } = req.body

    let message = 'Usuario creado con exito'
    let statusCode = 200
    let response = true

    try{

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req_usucontrasenia, saltRounds);
        const token = crypto.randomBytes(32).toString('hex');

        const newUser = await prisma.usuusuarios.create({
            data : {
                usucorreo       : req_usunombre,
                usuusuario      : req_usuusuario,
                usucontrasenia  : hashedPassword,
                usutoken        : token
            }
        })
        
    }catch(err){
        console.log(err)
        response    = false
        message     = 'Ha ocurrido un error al crear al usuario'
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

controller.MigrateUsers = async (req, res) => {
    
}

module.exports = controller
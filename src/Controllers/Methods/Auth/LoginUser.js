const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');
const crypto = require('crypto');


controller.LoginUser = async (req, res) => {
    
    let response    = true
    let message     = 'Usuario autenticado con exito'
    let statusCode  = 200

    const {
        tornid,
        usuusuario,
        usucontrasena,
    } = req.body

    let data = {}

    try{

        const user = await prisma.usuusuarios.findFirst({
            where : {
                usuusuario : usuusuario
            },
        })

        const passwordMatch = await bcrypt.compare(usucontrasena, user.usucontrasenia)

        if(!passwordMatch){
            const token = crypto.randomBytes(32).toString('hex')

            await prisma.usuusuarios.update({
                where : {
                    usuid : user.usuid
                },
                data : {
                    usutoken : token
                }
            })

            data = {
                usuusuario  : user.usuusuario,
                usutoken    : token,
                tornid      : tornid,
                tornombre   : tornid == 2 ? 'EM' : 'CA'
            }
        }else{
            response    = false
            statusCode  = 500
            message     = 'La contrasena es incorrecta'
    
        }
    }catch(err){
        console.log(err)
        response = false
        statusCode = 500
        message    = 'Ha ocurrido un error al logear al usuario'

    }finally{


        await prisma.$disconnect()
        return res.status(statusCode)
                    .json({
                        response,
                        message,
                        data
                    })
    }
}

module.exports = controller
const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const MetLoginUser = require('../../Methods/Auth/LoginUser')

controller.LoginUser = async (req, res) => {
    
    const {
        usuusuario,
    } = req.body

    try{

        const user = await prisma.usuusuarios.findFirst({
            where : {
                usuusuario : usuusuario
            }
        })

        if(user){
            await MetLoginUser.LoginUser(req, res)
        }else{
            return res.status(500)
            . json({
                response    : false,
                message     : "El usuario no se encuentra registrado"
            })
        }

    }catch(err){
        console.log(err)
        await prisma.$disconnect()
        return res.status(500)
                    . json({
                        response    : false,
                        message     : "Error auth user"
                    })
    }
}

module.exports = controller
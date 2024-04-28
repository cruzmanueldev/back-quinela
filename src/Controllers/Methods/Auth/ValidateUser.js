const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

controller.ValidateUser = async (req, res) => {

    const {
        usutoken,
        tornid
    } = req.headers
    
    let response    = true
    let message     = 'El usuario fue autenticado con exito'
    let statusCode  = 200
    let data        = {}

    try{

        data = await prisma.usuusuarios.findFirst({
            where : {
                usutoken : usutoken
            },
            select : {
                usuusuario  : true,
                usutoken    : true
            }
        })
        console.log(data)
        if(data){
            data = {
                ...data,
                tornid      : tornid,
                tornombre   : tornid == 2 ? 'EM' : 'CA'
            }
            console.log("datados")
            console.log(data);
        }else{
            statusCode = 500
            message    = 'Su sesion ha expirado'
        }
    }catch(err){

        statusCode = 500
        message    = 'Ha ocurrido un error al validar al usuario'

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
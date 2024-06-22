const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

controller.AllUsers = async (req, res) => {
    
    let response    = true
    let message     = 'Los usuarios fueron obtenidos con exito'
    let statusCode  = 200
    let messageDev  = ''
    let data        = []

    try{

        const users = await prisma.usuusuarios.findMany({
            select : {
                usuusuario : true
            }
        })

    }catch(err){
        console.log(err)
        messageDev = err.toString()
        statusCode = 500
        message    = 'Ha ocurrido un error al obtener a los usuarios'

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
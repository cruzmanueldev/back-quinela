const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

controller.EditQuinela = async (req, res) => {

    const {
        formQuinela,
        usutoken
    } = req.body

    let data = []
    let statusCode  = 200
    let response    = true
    let message     = 'La quinela se ha editado con exito'

    try{


    }catch(err){
        statusCode  = 500
        response    = false
        message     = 'Ha ocurrido un error al editar la quinela'
        console.log(err)
    }finally{
        await prisma.$disconnect()
        res.status(statusCode)
            .json({
                response,
                message,
                data
            })
    }


}

module.exports = controller
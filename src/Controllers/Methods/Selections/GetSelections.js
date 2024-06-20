const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

controller.GetSelections = async (req, res) => {

    let statusCode  = 200
    let response    = true
    let message     = 'Las selecciones se han obtenido con exito'
    let data        = []

    try{

        data = await prisma.selselecciones.findMany({})

        data.map(dat => {
            dat['value'] = dat['selid']
            dat['label'] = dat['selnombre']
        })

    }catch(err){
        statusCode  = 500
        response    = false
        message     = 'Ha ocurrido un error al obtener las selecciones'
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
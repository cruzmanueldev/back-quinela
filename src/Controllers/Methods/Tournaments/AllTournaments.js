const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

controller.AllTournaments = async (req, res) => {

    let statusCode  = 200
    let response    = true
    let message     = 'Se han obtenido los torneos con exito'
    let data        = []

    try{

        data = await prisma.tortorneos.findMany({
        })

        data.map(dat => {
            dat['value'] = dat['tornid']
            dat['label'] = dat['tortorneo']
        })
    
    }catch(err){
        statusCode  = 500
        response    = false
        message     = 'Ha ocurrido un error al crear la seleccion'
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
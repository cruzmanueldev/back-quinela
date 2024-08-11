const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

controller.GetLastMatches = async (req, res) => {

    const {
        selid
    } = req.body

    let data = []
    let statusCode  = 200
    let response    = true
    let message     = 'Los ultimos partidos se han obtenido con exito'

    try{
        data = await prisma.pahpartidoshistoricos.findMany({
            where : {
                selid : selid 
            },
            orderBy: [
                {
                  pahid: 'asc',
                }
            ],
            take : 10
        })

    }catch(err){
        statusCode  = 500
        response    = false
        message     = 'Ha ocurrido un error al obtener los ultimos partidos'
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
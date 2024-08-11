const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

controller.PositionsUsers = async (req, res) => {
    
    let response    = true
    let message     = 'Se obtuvo la tabla de posiciones de los usuarios con exito'
    let statusCode  = 200
    let messageDev  = ''
    let data        = []

    try{

        data = await prisma.puupuntosusuarios.groupBy({
            by : ['usuid'],
            _sum : {
                puupuntostotal : true,
                puupuntosmarcador : true,
                puupuntosresultado : true,
                puupuntosgoles : true
            },
        })

        for await (const dat of data){

            const prevPos = await prisma.phupuntoshistorialusuarios.findFirst({
                where : {
                    usuid : dat.usuid
                }
            })

            const user = await prisma.usuusuarios.findFirst({
                where : {
                    usuid : dat.usuid
                }
            })

            dat['user'] = user.usuusuario
            dat['prevPos'] = prevPos.phuposicion
        }

        data.sort((a, b) => b._sum.puupuntostotal - a._sum.puupuntostotal);

    }catch(err){
        console.log(err)
        messageDev = err.toString()
        statusCode = 500
        message    = 'Ha ocurrido un error al obtener la tabla de posiciones de los usuarios'

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
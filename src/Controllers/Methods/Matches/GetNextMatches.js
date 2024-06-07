const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

controller.GetNextMatches = async (req, res) => {

    const {
        tornid
    } = req.body

    const {
        usutoken
    } = req.headers

    let data = []
    let statusCode  = 200
    let response    = true
    let message     = 'Los siguientes partidos se han obtenido con exito'

    try{

        const usu = await prisma.usuusuarios.findFirst({
            where : {
                usutoken : usutoken
            }
        })

        const fec = await prisma.fecfechas.findFirst({
            where : {
                fecabierto  : true,
                tornid      : parseInt(tornid)
            }
        })

        data = await prisma.parpartidos.findMany({
            where : {
                fecid : fec.fecid,
            },
            select : {
                parfecha    : true,
                partid      : true,
                parlocalsel : {
                    select : {
                        selnombre : true,
                        selimagen : true,
                        selabreviacion : true
                    }
                },
                parvisitasel : {
                    select : {
                        selnombre : true,
                        selimagen : true, 
                        selabreviacion : true
                    }
                },
            }
        })
        console.log(usu)

        for await(const dat of data){
            const pru = await prisma.pruprediccionusuarios.findFirst({
                where : {
                    partid  : dat.partid,
                    usuid   : usu.usuid 
                }
            })

            dat['pru'] = pru
        }

    }catch(err){
        statusCode  = 500
        response    = false
        message     = 'Ha ocurrido un error al obtener los siguientes partidos'
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
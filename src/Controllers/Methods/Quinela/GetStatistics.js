const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

controller.GetStatistics = async (req, res) => {

    const {
        req_tornid
    } = req.body

    let statusCode  = 200
    let response    = true
    let message     = 'Las estadisticas de la quinela se han obtenido con exito'
    let data        = []

    try{

        const fec = await prisma.fecfechas.findFirst({
            where : {
                fecabierto  : true,
                tornid      : req_tornid
            }
        })

        data = await prisma.parpartidos.findMany({
            where : {
                fecid : fec.fecid,
            },
            select : {
                partid      : true,
                parlocalsel : {
                    select : {
                        selimagen : true,
                        selabreviacion : true
                    }
                },
                parvisitasel : {
                    select : {
                        selabreviacion : true,
                        selimagen : true, 
                    }
                },
            }
        })

        for await(const dat of data){

            const pru = await prisma.pruprediccionusuarios.findMany({
                where : {
                    partid  : dat.partid,
                }
            })

            dat['percentageHome'] = 0
            dat['percentageAway'] = 0
            dat['percentageEmpty'] = 0

            if(pru.length != 0){
                const sumHome = pru.filter(pr => pr.pruganador == 1).length                
                const sumAway = pru.filter(pr => pr.pruganador == 2).length                
                const sumEmpty = pru.length - sumHome - sumAway 

                dat['percentageHome'] = ( sumHome / pru.length ) * 100;
                dat['percentageAway'] = ( sumAway / pru.length ) * 100;
                dat['percentageEmpty'] = ( sumEmpty / pru.length ) * 100;
            }
        }

    }catch(err){
        statusCode  = 500
        response    = false
        message     = 'Ha ocurrido un error al obtener las estadisticas'
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
const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

controller.GetMatchesEM = async (req, res) => {

    const {
        tornid
    } = req.body

    let statusCode  = 200
    let response    = true
    let message     = 'Los partidos se han obtenido con exito'
    let data        = []

    try{

        data = await prisma.fecfechas.findMany({
            where : {
                tornid : parseInt(tornid)
            },
            select : {
                fecid : true,
                fecnombre : true
            }
        })

        for await(const dat of data){
            console.log(dat.fecid)
            const pars = await prisma.parpartidos.findMany({
                where : {
                    fecid : dat.fecid,
                    tornid: parseInt(tornid)
                },
                select : {
                    pargoleslocal : true,
                    pargolesvisita : true,
                    parfecha : true,
                    parlocalsel : {
                        select : {
                            selnombre : true,
                            selimagen : true
                        }
                    },
                    parvisitasel : {
                        select : {
                            selnombre : true,
                            selimagen : true
                        }
                    },
                    pargrupos : {
                        select : {
                            grunombre : true
                        }
                    }
                }
            })
            dat['data'] = pars
        }



        // data.map(dat => {
        //     dat['value'] = dat['selid']
        //     dat['label'] = dat['selnombre']
        // })

    }catch(err){
        statusCode  = 500
        response    = false
        message     = 'Ha ocurrido un error al obtener los partidos'
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
const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

controller.GetDataPrediction = async (req, res) => {

    const {
        req_tornid
    } = req.body

    let data = {}
    let statusCode  = 200
    let response    = true
    let message     = 'La data se ha obtenido con exito'

    try{

        const teams = await prisma.selselecciones.findMany({
            where : {
                selconmebol : true
            }
        })

        const fec = await prisma.fecfechas.findFirst({
            where : {
                fecabierto : true,
                tornid : req_tornid
            }
        })

        let mats = await prisma.parpartidos.findMany({
            where : {
                tornid : req_tornid
            },
            select : {
                fecid : true,
                partid : true,
                pargoleslocal : true,
                parganador : true,
                pargolesvisita : true,
                parfinalizado : true,
                parlocalsel : {
                    select : {
                        selid       : true,
                        selnombre   : true,
                        selimagen   : true,
                        selabreviacion : true
                    }
                },
                parvisitasel : {
                    select : {
                        selid       : true,
                        selnombre   : true,
                        selimagen   : true, 
                        selabreviacion : true
                    }
                },
            }
        })

        mats.forEach(mat => {
            mat['paractivo'] = !mat.parfinalizado 
        })

        data = {
            ...data,
            teams : teams,
            mats : mats,
            fec : fec
        }
        
    }catch(err){
        statusCode  = 500
        response    = false
        message     = 'Ha ocurrido un error al obtener la data'
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
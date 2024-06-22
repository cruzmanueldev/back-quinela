const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

controller.CloseQuinela = async (req, res) => {

    const {
        req_partid,
        req_selhome,
        req_selaway,
        req_pargoalhome,
        req_pargoalaway
    } = req.body

    let data = []
    let statusCode  = 200
    let response    = true
    let message     = 'La quinela se ha cerrado con exito'

    try{

        const winId = req_pargoalhome > req_pargoalaway 
                            ? req_selhome 
                            : req_pargoalaway > req_pargoalhome 
                                ? req_selaway : null

        const paru = await prisma.parpartidos.update({
            where : {
                partid : req_partid
            },
            data : {
                pargoleslocal   : req_pargoalhome,
                pargolesvisita  : req_pargoalaway,
                parganador      : winId,
                parfinalizado   : true
            }
        })

        const pganador = paru.parganador == paru.parlocal
                            ? 1
                            : paru.parganador == paru.parvisita
                            ? 2 : 0

        const prus = await prisma.pruprediccionusuarios.findMany({
            where : {
                partid : req_partid
            }
        })

        let dataPuu = []

        for await( const pru of prus){
            const ptosresultado = pru.pruganador == pganador ? 3 : 0
            const ptosmarcador  = pru.prugoleslocal == paru.pargoleslocal && pru.prugolesvisita == paru.pargolesvisita ? 2 : 0
            const ptosglocal =  pru.prugoleslocal == paru.pargoleslocal ? 1 : 0
            const ptosgvisita =  pru.prugolesvisita == paru.pargolesvisita ? 1 : 0
            const ptosTotal = ptosresultado + ptosmarcador + ptosglocal + ptosgvisita

            dataPuu.push({
                pruid : pru.pruid,
                usuid : pru.usuid,
                fecid : paru.fecid,
                puupuntostotal : ptosTotal,
                puupuntosmarcador : ptosmarcador,
                puupuntosresultado : ptosresultado,
                puupuntosgoles : ptosglocal + ptosgvisita
            })
        }

        await prisma.puupuntosusuarios.createMany({
            data : dataPuu
        })

    }catch(err){
        statusCode  = 500
        response    = false
        message     = 'Ha ocurrido un error al cerrar la quinela'
        console.log(err)
    }finally{
        res.status(statusCode)
            .json({
                response,
                message
            })
    }
}

module.exports = controller
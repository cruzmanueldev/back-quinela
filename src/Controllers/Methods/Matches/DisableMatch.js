const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

controller.DisableMatch = async (req, res) => {

    const {
        req_partid,
    } = req.body

    let statusCode  = 200
    let response    = true
    let message     = 'Se ha deshabilitado el partido con exito'

    try{
        
        const pusers = await prisma.pruprediccionusuarios.groupBy({
            by: ['usuid'],
            _count: {
              usuid: true,
            },
            where : {
                partid : req_partid
            }
        })

        pusers.forEach(puser => {
            if(puser['_count']['usuid'] > 1){
                message = "Existe un usuario con mas de un pronostico"
                response = false
            }
        });

        await prisma.parpartidos.update({
            where : {
                partid : req_partid
            },
            data : {
                parbloqueado : true
            }
        })

    }catch(err){
        statusCode  = 500
        response    = false
        message     = 'Ha ocurrido un error al deshabilitar el partido'
        console.log(err)
    }finally{
        
        await prisma.$disconnect()
        res.status(statusCode)
            .json({
                response,
                message,
            })
    }
}

module.exports = controller
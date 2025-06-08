const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

controller.GetAllMatches = async (req, res) => {

  let data = []
  let statusCode = 200
  let response = true
  let message = 'Los partidos se han obtenido con exito'

  try {

    const fecs = await prisma.fecfechas.findMany({
      where: {
        tornid: 2
      }
    })


    for await (const fec of fecs) {
      const pars = await prisma.parpartidos.findMany({
        where: {
          fecid: fec.fecid,
          tornid: 2
        },
        select: {
          pargoleslocal: true,
          pargolesvisita: true,
          parfinalizado: true,
          parlocalsel: {
            select: {
              selid: true,
              selnombre: true,
              selimagen: true,
              selabreviacion: true
            }
          },
          parvisitasel: {
            select: {
              selid: true,
              selnombre: true,
              selimagen: true,
              selabreviacion: true
            }
          },
        }
      })

      let dataFech = []
      pars.forEach(par => {
        dataFech.push({
          parfinalizado: par.parfinalizado,
          selidlocal: par.parlocalsel.selid,
          selidvisita: par.parvisitasel.selid,
          selnombrelocal: par.parlocalsel.selnombre,
          selnombrevisita: par.parvisitasel.selnombre,
          selimglocal: par.parlocalsel.selimagen,
          selimgvisita: par.parvisitasel.selimagen,
          selgollocal: par.pargoleslocal,
          selgolvisita: par.pargolesvisita
        })
      })

      data.push({
        fecid: fec.fecid,
        fecnombre: fec.fecnombre,
        data: dataFech
      })

    }

  } catch (err) {
    statusCode = 500
    response = false
    message = 'Ha ocurrido un error al obtener los partidos'
    console.log(err)
  } finally {
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

const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

controller.GetLastResults = async (req, res) => {

  const {
    fecid
  } = req.body

  let statusCode = 200
  let response = true
  let message = 'Los ultimos resultados de la jornada se han obtenido con exito'
  let data = []

  try {

    const results = await prisma.puupuntosusuarios.groupBy({
      by: ['usuid'],
      _sum: {
        puupuntostotal: true,
      },
      where: {
        fecid: fecid
      },
      orderBy: {
        _sum: {
          puupuntostotal: 'desc',
        }
      }
    })

    const matches = await prisma.parpartidos.findMany({
      where: {
        fecid: fecid
      }
    })

    data = await Promise.all(
      results.map(async (item) => {
        const usuario = await prisma.usuusuarios.findUnique({
          where: { usuid: item.usuid },
          select: { usuusuario: true, }
        });

        const predicts = await prisma.pruprediccionusuarios.findMany({
          select: {
            partid: true,
            prugoleslocal: true,
            prugolesvisita: true,
            pruganador: true,
            pruparpartidos: {
              select: {
                parganador: true,
                pargoleslocal: true,
                parlocal: true,
                parvisita: true,
                pargolesvisita: true,
                parlocalsel: {
                  select: {
                    selnombre: true,
                    selabreviacion: true,
                    selimagen: true
                  }
                },
                parvisitasel: {
                  select: {
                    selnombre: true,
                    selabreviacion: true,
                    selimagen: true
                  }
                }
              }
            }
          },
          where: {
            usuid: item.usuid,
            partid: {
              in: matches.map(mat => mat.partid)
            }
          }
        })

        predicts.forEach(dat => {
          if (dat.pruparpartidos.parlocal == dat.pruparpartidos.parganador) {
            dat['parganador'] = 1
          } else if (dat.pruparpartidos.parvisita == dat.pruparpartidos.parganador) {
            dat['parganador'] = 2
          } else {
            dat['parganador'] = 0
          }
        });

        return {
          ...item,
          usuario,
          predicts
        };
      })
    );

  } catch (err) {
    statusCode = 500
    response = false
    message = 'Ha ocurrido un error al obtener las estadisticas'
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
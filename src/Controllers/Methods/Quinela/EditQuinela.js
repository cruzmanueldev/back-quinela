const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

controller.EditQuinela = async (req, res) => {

    const {
        formQuinela,
    } = req.body

    const {
        usutoken
    } = req.headers

    let data = []
    let statusCode  = 200
    let response    = true
    let message     = 'La quinela se ha editado con exito'

    const usu = await prisma.usuusuarios.findFirst({
        where : {
            usutoken : usutoken
        }
    })

    try{

        for await (const form of formQuinela){
            const prue = await prisma.pruprediccionusuarios.findFirst({
                where : {
                    usuid : usu.usuid,
                    partid : form.partid
                }
            })

            const goalhome = parseInt(form.goalhome)
            const goalaway = parseInt(form.goalaway)

            if(prue){
                await prisma.pruprediccionusuarios.update({
                    where : {
                        usuid : usu.usuid,
                        partid : form.partid
                    },
                    data : {
                        prugoleslocal : goalhome,
                        prugolesvisita : goalaway,
                        pruganador : goalhome > goalaway ? 1 : goalaway > goalhome ? 2 : 0
                    }
                })
            }else{
                await prisma.pruprediccionusuarios.create({
                    data : {
                        usuid : usu.usuid,
                        partid : form.partid,
                        prugoleslocal : goalhome,
                        prugolesvisita : goalaway,
                        pruganador : goalhome > goalaway ? 1 : goalaway > goalhome ? 2 : 0
                    }
                })
            }
        }

    }catch(err){
        statusCode  = 500
        response    = false
        message     = 'Ha ocurrido un error al editar la quinela'
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
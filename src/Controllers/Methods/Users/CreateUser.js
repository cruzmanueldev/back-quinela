const controller = {}
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

controller.CreateUser = async ( req, res ) => {

    const {
        req_usunombre,
        req_usuusuario,
        req_usucontrasenia
    } = req.body

    try{

        const newUser = await prisma.usuusuarios.create({
            data : {
                usunombre : req_usunombre,
                usuusuario: req_usuusuario
            }
        })
        
    }catch(err){
        return res.status(500)
                    .json({
                        response    : false,
                        message     : 'Ha ocurrido un error al crear al usuario'
                    })
    }

}

module.exports = controller
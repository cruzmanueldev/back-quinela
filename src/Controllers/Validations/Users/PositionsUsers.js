const controller = {}
const MetPositionsUsers = require('../../Methods/Users/PositionsUsers')

controller.PositionsUsers = async ( req, res ) => {

    try{

        await MetPositionsUsers.PositionsUsers(req,res)

    }catch(err){
        console.log(err)
        return res.status(500)
                    .json({
                        response    : false,
                        message     : 'Ha ocurrido un error al obtener la posicion de los usuarios'
                    })
    }
}

module.exports = controller
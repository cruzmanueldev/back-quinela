const controller = {}
const MetEditUser = require('../../Methods/Users/EditUser')

controller.EditUser = async ( req, res ) => {

    try{

        await MetEditUser.EditUser(req,res)

    }catch(err){
        console.log(err)
        return res.status(500)
                    .json({
                        response    : false,
                        message     : 'Ha ocurrido un error al editar al usuario'
                    })
    }

}

module.exports = controller
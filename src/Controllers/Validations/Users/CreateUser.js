const controller = {}
const MetCreateUser = require('../../Methods/Users/CreateUser')

controller.CreateUser = async ( req, res ) => {

    try{

        await MetCreateUser.CreateUser(req,res)

    }catch(err){
        console.log(err)
        return res.status(500)
                    .json({
                        response    : false,
                        message     : 'Ha ocurrido un error al crear al usuario'
                    })
    }

}

module.exports = controller
const controller = {}

controller.CreateUser = async ( req, res ) => {

    try{

    }catch(err){
        return res.status(500)
                    .json({
                        response    : false,
                        message     : 'Ha ocurrido un error al crear al usuario'
                    })
    }

}

module.exports = controller
const controller = {}
const MetCloseQuinela = require('../../Methods/Quinela/CloseQuinela')

controller.CloseQuinela = async (req, res) => {

    try{

        await MetCloseQuinela.CloseQuinela(req, res)

    }catch(err){
        console.log(err)
        return res.status(500)
                    .json({
                        response    : false,
                        message     : 'Ha ocurrido un error al cerrar la quinela'
                    })
    }
}

module.exports = controller
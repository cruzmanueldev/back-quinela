const controller = {}
const MetEditQuinela = require('../../Methods/Quinela/EditQuinela')

controller.EditQuinela = async (req, res) => {

    try{

        await MetEditQuinela.EditQuinela(req, res)

    }catch(err){
        console.log(err)
        return res.status(500)
                    .json({
                        response    : false,
                        message     : 'Ha ocurrido un error al editar la quinela'
                    })
    }
}

module.exports = controller
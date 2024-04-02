const controller = {}
const MetCreateSelection = require('../../Methods/Selections/CreateSelection')

controller.CreateSelection = async (req, res) => {

    try{

        await MetCreateSelection.CreateSelection(req, res)

    }catch(err){
        console.log(err)
        return res.status(500)
                    .json({
                        response    : false,
                        message     : 'Ha ocurrido un error al crear a la seleccion'
                    })
    }
}

module.exports = controller
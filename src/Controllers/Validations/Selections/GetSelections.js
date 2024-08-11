const controller = {}
const MetGetSelections = require('../../Methods/Selections/GetSelections')

controller.GetSelections = async (req, res) => {

    try{

        await MetGetSelections.GetSelections(req, res)

    }catch(err){
        console.log(err)
        return res.status(500)
                    .json({
                        response    : false,
                        message     : 'Ha ocurrido un error al obtener las selecciones'
                    })
    }
}

module.exports = controller
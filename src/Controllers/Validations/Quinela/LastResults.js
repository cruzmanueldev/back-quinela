const controller = {}
const MetGetLastResults = require('../../Methods/Quinela/LastResults')

controller.GetLastResults = async (req, res) => {

    try{

        await MetGetLastResults.GetLastResults(req, res)

    }catch(err){
        console.log(err)
        return res.status(500)
                    .json({
                        response    : false,
                        message     : 'Ha ocurrido un error al obtener los ultimos resultados'
                    })
    }
}

module.exports = controller
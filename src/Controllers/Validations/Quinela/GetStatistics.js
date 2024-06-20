const controller = {}
const MetGetStatistics = require('../../Methods/Quinela/GetStatistics')

controller.GetStatistics = async (req, res) => {

    try{

        await MetGetStatistics.GetStatistics(req, res)

    }catch(err){
        console.log(err)
        return res.status(500)
                    .json({
                        response    : false,
                        message     : 'Ha ocurrido un error al obtener las estadisticas de la quinela'
                    })
    }
}

module.exports = controller
const controller = {}
const MetGetDataPrediction = require('../../Methods/Matches/GetDataPrediction')

controller.GetDataPrediction = async (req, res) => {

    try{

        await MetGetDataPrediction.GetDataPrediction(req, res)

    }catch(err){
        console.log(err)
        return res.status(500)
                    .json({
                        response    : false,
                        message     : 'Ha ocurrido un error al obtener los partidos'
                    })
    }
}

module.exports = controller
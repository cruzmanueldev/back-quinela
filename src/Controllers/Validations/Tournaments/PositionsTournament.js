const controller = {}
const MetPositionsTournament = require('../../Methods/Tournaments/PositionsTournament')

controller.PositionsTournament = async (req, res) => {

    try{

        await MetPositionsTournament.PositionsTournament(req, res)

    }catch(err){
        console.log(err)
        return res.status(500)
                    .json({
                        response    : false,
                        message     : 'Ha ocurrido un error al obtener la tabla de posiciones'
                    })
    }
}

module.exports = controller
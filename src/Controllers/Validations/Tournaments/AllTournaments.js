const controller = {}
const MetAllTournaments = require('../../Methods/Tournaments/AllTournaments')

controller.AllTournaments = async (req, res) => {

    try{

        await MetAllTournaments.AllTournaments(req, res)

    }catch(err){
        console.log(err)
        return res.status(500)
                    .json({
                        response    : false,
                        message     : 'Ha ocurrido un error al obtener los torneos'
                    })
    }
}

module.exports = controller
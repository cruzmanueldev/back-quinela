const controller = {}
const MetGetNextMatches = require('../../Methods/Matches/GetNextMatches')

controller.GetNextMatches = async (req, res) => {

    try{

        await MetGetNextMatches.GetNextMatches(req, res)

    }catch(err){
        console.log(err)
        return res.status(500)
                    .json({
                        response    : false,
                        message     : 'Ha ocurrido un error al obtener los siguientes partidos'
                    })
    }
}

module.exports = controller
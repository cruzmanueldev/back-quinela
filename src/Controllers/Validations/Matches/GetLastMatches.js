const controller = {}
const MetGetLastMatches = require('../../Methods/Matches/GetLastMatches')

controller.GetLastMatches = async (req, res) => {

    try{

        await MetGetLastMatches.GetLastMatches(req, res)

    }catch(err){
        console.log(err)
        return res.status(500)
                    .json({
                        response    : false,
                        message     : 'Ha ocurrido un error al obtener los ultimos partidos'
                    })
    }
}

module.exports = controller
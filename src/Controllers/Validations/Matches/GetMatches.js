const controller = {}
const MetGetMatchesEM = require('../../Methods/Matches/GetMatches')

controller.GetMatches = async (req, res) => {

    try{

        await MetGetMatchesEM.GetMatchesEM(req, res)

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
const controller = {}
const MetGetNextMatchesTeam = require('../../Methods/Matches/GetNextMatchesTeam')

controller.GetNextMatchesTeam = async (req, res) => {

    try{

        await MetGetNextMatchesTeam.GetNextMatchesTeam(req, res)

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
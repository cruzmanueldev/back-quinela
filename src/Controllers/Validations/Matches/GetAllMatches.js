const controller = {}
const MetGetAllMatches = require('../../Methods/Matches/GetAllMatches')

controller.GetAllMatches = async (req, res) => {

    try{

        await MetGetAllMatches.GetAllMatches(req, res)

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
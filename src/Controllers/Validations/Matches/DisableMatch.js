const controller = {}
const MetDisableMatch = require('../../Methods/Matches/DisableMatch')

controller.DisableMatch = async (req, res) => {

    try{

        await MetDisableMatch.DisableMatch(req, res)

    }catch(err){
        console.log(err)
        return res.status(500)
                    .json({
                        response    : false,
                        message     : 'Ha ocurrido un error al deshabilitar el partido'
                    })
    }


}

module.exports = controller
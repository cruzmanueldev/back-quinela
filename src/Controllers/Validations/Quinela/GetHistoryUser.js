const controller = {}
const MetGetHistoryUser = require('../../Methods/Quinela/GetHistoryUser')

controller.GetHistoryUser = async (req, res) => {

    try{

        await MetGetHistoryUser.GetHistoryUser(req, res)

    }catch(err){
        console.log(err)
        return res.status(500)
                    .json({
                        response    : false,
                        message     : 'Ha ocurrido un error al obtener el historial'
                    })
    }
}

module.exports = controller
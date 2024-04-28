const controller = {}
const MetValidateUser = require('../../Methods/Auth/ValidateUser')

controller.ValidateUser = async (req, res) => {
    
    try{

         await MetValidateUser.ValidateUser(req, res)
   
    }catch(err){
        console.log(err)
        return res.status(500)
                    . json({
                        response    : false,
                        message     : "Error auth user"
                    })
    }
}

module.exports = controller
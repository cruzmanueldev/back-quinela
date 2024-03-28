const controller = {}
const ValAllUsers = require('../../Methods/Users/AllUsers')

controller.AllUsers = async (req, res) => {
    
    try{

        await ValAllUsers.AllUsers(req, res)

    }catch(err){
        return res.status(500)
                    . json({
                        response    : false,
                        message     : "Error show all users"
                    })
    }
}

module.exports = controller
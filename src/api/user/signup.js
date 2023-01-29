const UsersService = require('../../services/UsersService')

module.exports = async function signup(req, res){
    try{
        let signupData = await UsersService.signup(req)
        res.status(signupData.status).json(signupData.data)
    }catch(err){
        res.status(500).json({message:"Some Error Occurred!"})
    }
}
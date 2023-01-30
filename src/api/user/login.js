const UsersService = require('../../services/UsersService')

module.exports = async function login(req, res){
    try{
        let loginData = await UsersService.login(req)
        
        res.status(loginData.status).json({message:loginData.message,token:loginData.token})
    }catch(err){
        res.status(500).json({message:"Some Error Occurred!"})
    }
}
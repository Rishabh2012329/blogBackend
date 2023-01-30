const UsersService = require('../../services/UsersService')

module.exports = async function signup(req, res){
    try{
        let signupData = await UsersService.signup(req)
        console.log(signupData)
        res.status(signupData.status).json({message: signupData.message, data:signupData.data})
    }catch(err){
        res.status(500).json({message:"Some Error Occurred!"})
    }
}
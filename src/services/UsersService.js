const UserModel = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class UserService {

    async signup(req) {
        try{
          const {email, password} = req.body
          // Validate user input
          if (!email || !password) {
            return {status: 404, message:"Invalid Request!"}
          }

          // check if user already exists
          const user = await UserModel.findOne({ email });
          if (user) 
          return {status: 404, message:"User Already Exists!"}
        
           // Hash the password using bcrypt
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          // Create a new user
          const newUser = new UserModel({
            email: email,
            password: hashedPassword
          });
      
          const result = await newUser.save()
          
          // Generate a JSON web token
          const token = jwt.sign({ email: result.email, userId: result._id }, 'secretkey');

          return {status: 200, message:"Created!", data:{newUser}, token}

        }catch(err){
          return {status: 500, message: err.message}
        }
      }
    
      async login(req) {
        try{
          const {email, password} = req.body

          // Validate user input
          if (!email || !password) {
            return {status:404, message:"Please provide email and password!"}
          }
      
          // Check if user exists and password is correct
          let user = await UserModel.findOne({ email: email })
          
          if (!user) {
            return {status:404, message:"No User"}
          }
          console.log(user)
          let result = bcrypt.compare(password, user.password)
              
          if (!result) {
            return {status:401, message:"Some Error Occured!"}
          }
          const token = jwt.sign({ email: user.email, userId: user._id }, 'secretkey');

          return {status:404, message:"Loggedin", token}

        }catch(err){

          return {status: 500, message: err.message}

        }    
          
      }

}

module.exports = new UserService()
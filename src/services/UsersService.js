const UserModel = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class UserService {

    async signup(req) {
        const {email, password} = req.body
        // Validate user input
        if (!email || !password) {
          return res.status(400).json({ message: 'Invalid request' });
        }
    
        // Create a new user
        const user = new UserModel({
          email: email,
          password: password
        });
    
        const result = await user.save()
        
        // Generate a JSON web token
        const token = jwt.sign({ email: result.email, userId: result._id }, 'secretkey');

        return {status: 200, message:"Created!", data:{user}, token}

        //   })
        //   .catch(error => {
        //     // Handle MongoDB errors
        //     if (error.code === 11000) {
        //       return res.status(409).json({ message: 'Email already exists' });
        //     }
        //     return res.status(500).json({ message: 'Error creating user' });
        //   });
      }
    
      login(req) {
        const {email, password} = req.body

        // Validate user input
        if (!email || !password) {
          // return status 404
        }
    
        // Check if user exists and password is correct
        User.findOne({ email: email })
          .then(user => {
            if (!user) {
              return res.status(401).json({ message: 'Auth failed' });
            }
    
            bcrypt.compare(password, user.password)
              .then(result => {
                if (!result) {
                  return res.status(401).json({ message: 'Auth failed' });
                }
                const token = jwt.sign({ email: user.email, userId: user._id }, 'secretkey');
                res.status(200).json({
                  message: 'Auth successful',
                  token: token
                });
              })
              .catch(error => {
                res.status(500).json({ message: 'Error logging in' });
              });
          })
          .catch(error => {
            res.status(500).json({ message: 'Error logging in' });
          });
      }

}

module.exports = new UserService()
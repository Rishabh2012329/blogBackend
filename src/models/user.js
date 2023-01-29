const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    passowrd: {
        type: String,
        required: true
    }
  });
  
const UserModel = mongoose.model('Users', userSchema);

module.exports = UserModel;
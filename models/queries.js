const mongoose = require('mongoose');
const { isEmail } = require('validator');
// const bcrypt = require('bcrypt');

const querySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        lowercase: true,
        validate: [(val) => {
            let regex = /^[A-Za-z][A-Za-z ]+$/
            if(val.match(regex)) {
              return true
            }
            else{
              return false
            }
        }, "Enter a valid name, atleast 2 characters long"]
    },
   
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        validate: [isEmail, 'Enter a valid email']

    },
    message: {
        type: String,
        required: [true, 'Please enter your message'],
        lowercase: true
    }

  }
);

  
const q = mongoose.model('query', querySchema);
  
module.exports = q;
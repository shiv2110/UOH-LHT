const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const signupaSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please enter your first name'],
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
    adminFor: {
        type: String,
        lowercase: true

    },
    
    adminid: {
        type: String,
        required: [true, 'Please enter your 7 character Admin ID'],
        unique: true,
        minlength: 7,
        maxlength: 7,
        lowercase: true,
        validate: [(val) => {
          let regex = /^[0-9a-zA-Z@_]{7}$/
          if(val.match(regex)) {
            return true
          }
          else{
            return false
          }
        }, "Enter a valid Admin ID"]

    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        validate: [isEmail, 'Enter a valid email']

    },
    password: {
        type: String,
        required: [true, "Enter a password"],
        validate: [(val) => {
            let regex = /^(?=.*[0-9])(?=.*[!@#_$%^&*])[a-zA-Z0-9!@#$%_^&*]{8,16}$/
            if(val.match(regex)) {
              return true
            }
            else{
              return false
            }
          }, "Password should be of length between 8 and 16, should consist of atleast 1 numeric digit and 1 special character"]
    },
    
    phone: {
        type: String,
        required: [true, 'Please enter your 10-12 digit phone number'],
        minlength: 10,
        maxlength: 12,
        validate: [(val) => {
            let regex = /^[0-9]{10,12}$/
            if(val.match(regex)) {
              return true
            }
            else{
              return false
            }
        }, "Enter a phone number"]
        

    },
    address: {
        type: String,
        required: [true, 'Please enter your address'],
        lowercase: true
    }
   
});


signupaSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

signupaSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ adminid: username });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('Incorrect password');
    }
    throw Error('Incorrect username');
  };
  
const adminSignup = mongoose.model('adminuser', signupaSchema);
  
module.exports = adminSignup;
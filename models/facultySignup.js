const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const signupfSchema = new mongoose.Schema({
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
    department: {
        type: String,
        lowercase: true

    },
    // lastname: {
    //     type: String,
    //     required: [true, 'Please enter your last name'],
    //     lowercase: true,
    //     validate: [(val) => {
    //         let regex = /^[a-zA-Z]{2,}$/
    //         if(val.match(regex)) {
    //           return true
    //         }
    //         else{
    //           return false
    //         }
    //     }, "Enter a first valid last name, atleast 2 characters long"]

    // },
    facultyid: {
        type: String,
        required: [true, 'Please enter your 4-digit Faculty ID'],
        unique: true,
        lowercase: true,
        minlength: 4,
        maxlength: 4,
        validate: [(val) => {
          let regex = /^[0-9]{4}$/
          if(val.match(regex)) {
            return true
          }
          else{
            return false
          }
        }, "Enter a valid registration number"]

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
    },
    books: [{ 
      bookName: 
          {type: String,
           lowercase: true}, 
      source: 
          {type: String}} 
    ]}
);


signupfSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

signupfSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ facultyid: username });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('Incorrect password');
    }
    throw Error('Incorrect username');
  };
  
const facultySignup = mongoose.model('facultyuser', signupfSchema);
  
module.exports = facultySignup;
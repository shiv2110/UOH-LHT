const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const signupsSchema = new mongoose.Schema({
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
    course: {
        type: String,
        lowercase: true

    },
    semester: {
        type: Number
    },
    regno: {
        type: String,
        required: [true, 'Please enter your 8-character registration number'],
        unique: true,
        lowercase: true,
        minlength: 8,
        maxlength: 8,
        validate: [(val) => {
          let regex = /^[1-3][0-9][a-z]{4}[0-9]{2}$/
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
            let regex = /^(?=.*[0-9])(?=.*[!@#_$%^&*])[a-zA-Z0-9!@#$%_^&*]{7,15}$/
            if(val.match(regex)) {
              return true
            }
            else{
              return false
            }
          }, "Password should be of length between 7 and 15, should consist of atleast 1 numeric digit and 1 special character"]
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
          {type: String}
      } 
    ],

    hostel: {
      guardian: {
        type: String,
        lowercase: true
      },
      guardianPhone: {
        type: String,
        minlength: 10,
        maxlength: 12,
        // validate: [(val) => {
        //     let regex = /^[0-9]{10,12}$/
        //     if(val.match(regex)) {
        //       return true
        //     }
        //     else{
        //       return false
        //     }
        // }, "Enter a valid phone number"]
      },
      bloodGroup: {
        type: String
      },
      gender: {
        type: String
      },
      hostelType: {
        type: String,
        lowercase: true
      },
      roomNo:{
        type: Number
      },
      medicalConcerns: {
        type: String
      }
    }

  }
);

signupsSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

signupsSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ regno: username });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('Incorrect password');
    }
    throw Error('Incorrect username');
  };
  
const studentSignup = mongoose.model('studentuser', signupsSchema);
  
module.exports = studentSignup;
const mongoose = require('mongoose');
const { isEmail } = require('validator');

const hostelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter hostel name"],
        unique: true
    },
    warden: {
        type: String,
        lowercase: true,
        required: [true, "Enter the warden name"]
    },
    hostelFor: {
        type: String
    },
    nRooms: {
        type: Number,
        required: [true, "Enter total number of rooms"]
    },
    email: {
        type: String,
        required: [true, 'Enter hostel email'],
        validate: [isEmail, 'Enter a valid email']
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
        }, "Enter a valid phone number"]
    },
    
    areAvailable: []
});

const addHostel = mongoose.model('hostel', hostelSchema);
  
module.exports = addHostel;
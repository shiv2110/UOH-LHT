const mongoose = require('mongoose');
const validator = require('mongoose-validator');



const tutorialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Enter Tutorial Title"],
        lowercase: true,
        unique: true
    },

    course: {
        type: String,
        lowercase: true
    },

    semester: {
        type: Number,
    },

    source: {
        type: String,
        required: [true, "Enter the YouTube Link for the tutorial"],
        validate: [(val) => {
            let regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
            if(val.match(regex)) {
              return true
            }
            else{
              return false
            }
        }, "Enter a valid URL"]
        
    },
  
    description: {
        type: String,
        lowercase: true,
        required: [true, "Enter tutorial description"]
    }

});


const addTuts = mongoose.model('tutorial', tutorialSchema);
  
module.exports = addTuts;
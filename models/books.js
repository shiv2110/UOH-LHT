const mongoose = require('mongoose');
const validator = require('mongoose-validator');



const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Enter book title"],
        lowercase: true,
        unique: true
    },

    author: {
        type: String,
        required: [true, "Enter the author name"],
        lowercase: true,

    },

    branch: {
        type: String,
    },

    publication: {
        type: String,
        required: [true, "Enter the publication"],
        lowercase: true
    },

    edition: {
        type: Number,
        required: [true, "Enter the book edition"],
    },

    isAvailable: {
        type: Boolean
    },

    description: {
        type: String,
        lowercase: true,
    },

    source: {
        type: String,
        required: [true, "Enter the source URL from where book can be downloaded"],
        validate: [(val) => {
            let regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
            if(val.match(regex)) {
              return true
            }
            else{
              return false
            }
        }, "Enter a valid URL"]
        
    }

});


const addBookSc = mongoose.model('book', bookSchema);
  
module.exports = addBookSc;
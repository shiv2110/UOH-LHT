const mongoose = require('mongoose');


const libraryUserSchema = new mongoose.Schema({
    userID: {
        type: String
    },
    fullname: {
        type: String,
        lowercase: true,
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    books: [ 
        {bookID: 
            {type: Object}, 
        bookName: 
            {type: String}, 
        returnDate: 
            {type: Date}} 
    ]
});


const libraryUser = mongoose.model('libraryUser', libraryUserSchema);
  
module.exports = libraryUser;
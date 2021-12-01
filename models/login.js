const mongoose = require('mongoose');
const { isUname } = require('validator');
const bcrypt = require('bcrypt');

const loginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: [isUname, "Enter a valid username"]
    },
    password: {
        type: String,
        required: [true, "Enter a valid password"],
        minlength: [7, "Minimum password length is 7 characters"]
    }
});

loginSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

loginSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect username');
  };
  
const login = mongoose.model('users', loginSchema);
  
module.exports = login;
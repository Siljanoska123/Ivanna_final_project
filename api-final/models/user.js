const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minLength: 3
  },
  last_name: {
    type: String,
    required: true,
    minLength: 3
  },
  birthday:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    require:true
  },
  image: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema)

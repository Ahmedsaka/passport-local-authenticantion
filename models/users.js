const mongoose = require('mongoose');
const passport = require('passport');
const Joi = require('joi');
//const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;
var user = new Schema({
  username:{
    type: String,
    require: true,
    minlength: 2,
    maxlength: 50,
  },
  password:{
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
  },
  email:{
    type: String,
    require: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  }
},
{
  collection:'user'
})
/*
function validateUser(user){
  const schema = {
    username: Joi.string().min(10).max(50).required(),
    password: Joi.string().min(8).max(1024).required(),
    email: Joi.string().min(5).max(255).required().email()
  }
  return Joi.validate(user, schema);
}
*/
//exports.validate = validateUser;//Export joi validate function
const users = mongoose.model('users', user);//Export schema
module.exports = users;

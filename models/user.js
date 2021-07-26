/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const validator = require('validator');
const bcrypt = require('bcrypt');
const WrongAuthError = require('../errors/wrong-auth')
const {errors} = require('../constants')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (valid) {
        return /([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})/.test(valid)
      },
      message: props => `${props.value} is not a valid email`
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
})

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then(user => {
      if (!user) {
        return Promise.reject(new WrongAuthError(errors.WrongEmailOrPassword));
      }
      return bcrypt.compare(password, user.password)
        .then(matched => {
          if (!matched) {
            return Promise.reject(new WrongAuthError(errors.WrongEmailOrPassword));
          }
          return user;
        })
    })
};

module.exports = mongoose.model('user', userSchema);
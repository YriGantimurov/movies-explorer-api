const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;

const generateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => {
      User.create({ name, email, password: hash })
        .then(() => {
          User.findOne({ email: email }, '-password')
            .then(user => {
              res.send({ data: user })
            })
            .catch(next)
        })
        .catch(next)
    })
}

const getUser = (req, res, next) => {
  User.findById(req.user)
    .then(user => res.send({ data: user }))
    .catch(next)
}

const userUpdate = (req, res, next) => {
  const { name, email } = req.body
  User.findByIdAndUpdate(req.user._id, { name: name, email: email }, {
    new: true,
    runValidators: true,
  })
    .then(user => res.send({ data: user }))
    .catch(next);
}

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then(user => {
      const token = jwt.sign({ _id: user._id },NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'); /*for development(without ".env" file) takes default value*/
      res.send({ token });
    })
    .catch(next);
}

module.exports = {
  getUser,
  userUpdate,
  generateUser,
  login
}
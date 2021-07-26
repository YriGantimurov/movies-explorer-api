const jwt = require('jsonwebtoken')
const WrongAuthError = require('../errors/wrong-auth');
const { NODE_ENV, JWT_SECRET } = process.env;
const {errors} = require('../constants')

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) throw new WrongAuthError(errors.NotAuthorized)
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'); /*for development(without ".env" file) takes default value*/
  } catch (err) {
    throw new WrongAuthError(errors.NotAuthrized);
  }
  req.user = payload;
  next();
};

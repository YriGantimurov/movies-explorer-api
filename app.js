// imports
const express = require('express');
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const { generateUser, login } = require('./controllers/users')
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routeValidator = require('express-route-validator')
const centralizedErrorHandler = require('./middlewares/centralizedErrorHandler');
const NotFoundError = require('./errors/not-found')

// mongoDB --- mongoose connection
mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// loggers --- requestLogger
app.use(requestLogger);
app.use(bodyParser.json())

// routes
app.post('/signup', routeValidator.validate({
  body: {
    email: { isEmail: true, isRequired: true },
    name: { isLength: { min: 2, max: 20 }, isRequired: true },
    password: { isLength: { min: 8, max: 20 }, isRequired: true }
  }
}), generateUser)
app.post('/signin',routeValidator.validate({
  body: {
    email: { isEmail: true, isRequired: true },
    password: { isLength: { min: 8, max: 20 }, isRequired: true }
  }
}), login);
app.use(auth)
app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));
app.use('*', () => {
  throw new NotFoundError('PageNotFound')
});

// loggers --- errorLogger
app.use(errorLogger);
app.use(centralizedErrorHandler)

// listner
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
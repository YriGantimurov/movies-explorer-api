const mongooseAdress = 'mongodb://localhost:27017/moviesdb';
const errors = {
    IdNotFound: 'IdNotFound',
    AccessError: 'AccessError',
    NotAuthorized: 'NotAuthorized',
    WrongEmailOrPassword: 'WrongEmailOrPassword',
    PageNotFound: 'PageNotFound',
};

module.exports = {
    mongooseAdress,
    errors,
}
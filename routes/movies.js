const router = require('express').Router();
const routeValidator = require('express-route-validator')
const { generateMovie, deleteMovie } = require('../controllers/movies')

router.post('/', routeValidator.validate({
    body: {
        country: {isRequired: true},
        director: {isRequired: true},
        duration: {isRequired: true, isNumeric: true},
        year: {isRequired: true},
        discription: {isRequired: true},
        image: {isRequired: true, isURL: {require_protocol: false}},
        trailer: {isRequired: true, isURL: {require_protocol: false}},
        thumbnail: {isRequired: true, isURL: {require_protocol: false}},
        movieId: {isRequired: true},
        nameRU: {isRequired: true},
        nameEN: {isRequired: true},
    }
}), generateMovie);
router.delete('/:movieId', routeValidator.validate({
    params: {
        movieId: { isMongoId: true, isRequired: true }
    }
}), deleteMovie);


module.exports = router;
const Movie = require('../models/movie')
const NotFoundError = require('../errors/not-found')
const AccessFailureError = require('../errors/access-failure')
const {errors} = require('../constants')

const getMovies = (req, res, next) => {
    Movie.find({})
        .populate('owner')
        .then(movies => res.send({ data: movies }))
        .catch(next);
}

const generateMovie = (req, res, next) => {
    const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } = req.body
    Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId, owner: req.user._id  })
        .then((movie) => {
            res.send({ data: movie })
        })
        .catch(next)
}

const deleteMovie = (req, res, next) => {
    Movie.findById(req.params.movieId)
        .then(movie => {
            if (!movie) throw new NotFoundError(errors.IdNotFound)
            if (req.user._id !== movie.owner.toString()) { throw new AccessFailureError(errors.AccessError) }
            Movie.findByIdAndRemove(req.params.movieId)
                .then(deletedmovie => res.send({ data: deletedmovie }))
                .catch(next)
        })
        .catch(next)
}

module.exports = {
    generateMovie,
    deleteMovie,
    getMovies
}
const Movie = require('../models/movie')
const NotFoundError = require('../errors/not-found')
const AccessFailureError = require('../errors/access-failure')

const generateMovie = (req, res, next) => {
    const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } = req.body
    Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId })
        .then((movie) => {
            res.send({ data: movie })
        })
        .catch(next)
}

const deleteMovie = (req, res, next) => {
    Movie.findById(req.params.movieId)
        .then(movie => {
            if (!movie) throw new NotFoundError('IdNotFound')
            if (req.user._id !== movie.owner.toString()) { throw new AccessFailureError('AccessError') }
            Movie.findByIdAndRemove(req.params.cardId)
                .then(deletedmovie => res.send({ data: deletedmovie }))
                .catch(next)
        })
        .catch(next)
}

module.exports = {
    generateMovie,
    deleteMovie
}
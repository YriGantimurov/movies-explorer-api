/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const validator = require('validator');

const movieSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    discription: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        validate: {
            validator: function (valid) {
                return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(valid)
            },
            message: props => `${props.value} is not a valid href`
        },
        required: true,
    },
    trailer: {
        type: String,
        validate: {
            validator: function (valid) {
                return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(valid)
            },
            message: props => `${props.value} is not a valid href`
        },
        required: true,
    },
    thumbnail: {
        type: String,
        validate: {
            validator: function (valid) {
                return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(valid)
            },
            message: props => `${props.value} is not a valid href`
        },
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    movieId: {
        type: String,
        required: true,
    },
    nameRU: {
        type: String,
        required: true,
    },
    nameEN: {
        type: String,
        required: true,
    },

})

module.exports = mongoose.model('movie', movieSchema);
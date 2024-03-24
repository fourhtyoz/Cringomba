const mongoose = require('mongoose');

const Schema = mongoose.Schema

const JokeSchema = new Schema({
    text: {
        type: String,
        required: true,
        minLength: 10
    }
})

module.exports = mongoose.model('Joke', JokeSchema)
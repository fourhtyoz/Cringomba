const asyncHandler = require('express-async-handler')

// Models
const Joke = require('../models/joke');

exports.index = asyncHandler(async (req, res, next) => {
    try {
        const randomJoke = await Joke.aggregate([{ $sample: { size: 1}}])

        if (randomJoke === null) {
            const err = new Error('There are no jokes in the DB')
            err.status = 200
            console.log(err)
            return next(err)
        }

        res.status(200).json({randomJoke})
    } catch (err) {
        res.status(500)
        console.log(err)
    }
})
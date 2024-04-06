const asyncHandler = require('express-async-handler')

// Models
const Joke = require('../models/joke');

exports.get_joke = asyncHandler(async (req, res, next) => {
    try {
        const joke = await Joke.aggregate([{ $sample: { size: 1}}])

        if (joke === null) {
            const e = new Error('There are no jokes in the DB')
            e.status = 200
            return next(e)
        }

        res.status(200).json({joke})
    } catch (e) {
        res.status(500)
        console.log(e)
    }
})
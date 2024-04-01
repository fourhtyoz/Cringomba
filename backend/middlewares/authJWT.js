const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyToken = (req, res, next) => {
    if (req.headers 
        && req.headers.authorization 
        && req.headers.authorization.split(' ')[0] === 'JWT'
        ) {
            console.log(2)
            jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, async (err, decode) => {
                if (err) {
                    return req.user = undefined
                }
                const user = await User.findOne({_id: decode.id}).exec()
                console.log(user)
                if (user) {
                    req.user = user
                    next()
                } else {
                    console.log('not found')
                }
            })
    } else {
        console.log(1)
        req.user = undefined
        next()
    }
}

module.exports = verifyToken

const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// Models
const User = require('../models/user');

exports.register = asyncHandler( async (req, res) => {
    const user = await User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: 'user',
        password: bcrypt.hashSync(req.body.password, 8)
    })

    try {
        user.save()
        res.status(200).send({message: 'User has been created'})
    } catch (err) {
        return res.status(500).send({message: err})
    }
})

exports.login = asyncHandler( async (req, res) => {
    const user = await User.findOne({email: req.body.email}).exec()
    console.log(user)
    if (!user) {
        return res.status(500).send({message: 'User not found'})
    } else {
        const passwordIsCorrect = bcrypt.compare(req.body.password, user.password)
        if (!passwordIsCorrect) {
            return res.status(404).send({message: 'Invalid password', accessToken: null})
        }
        const token = jwt.sign({
            id: user.id
        }, process.env.API_SECRET, {
            expiresIn: 86400
        })

        res.status(200).send({
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            },
            message: 'Logged in successfully',
            accessToken: token
        })
    }
})
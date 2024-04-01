const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is not provided'],
        maxLength: 60,
        minLength: 2,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is not provided'],
        maxLength: 60,
        minLength: 2,
    },
    email: {
        type: String,
        unique: [true, 'Wrong Email'], // log into sentry,
        lowercase: true,
        trim: true,
        required: [true, 'Email is not provided'],
        validate: {
            validator: (value) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email'
        },
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'staff', 'premium'],
        default: 'user',
    },
    password: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User', userSchema)
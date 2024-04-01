const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const verifyToken = require('./middlewares/authJWT');
const dotenv = require('dotenv')
dotenv.config()

// DB
const mongoDB = process.env.MONGODB_URL
mongoose.set('strictQuery', false)
async function connectToDB() {
    try {
        await mongoose.connect(mongoDB)
        console.log('Connected to DB')
    } catch (err) {
        console.log(err)
    }
}
connectToDB()

// Routers
const indexRouter = require('./routes/index')

const app = express()

// Middleware
app.use(cors())
app.use(morgan('common'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// URLs
app.use('/', indexRouter)

// 404
app.use((req, res, next) => {
    next(createError(404));
  });

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log('Server is listening on ' + port)
})
const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const requireAuth = require('./middlewares/requireAuth');
const dotenv = require('dotenv')
const createError = require('http-errors');
const bodyParser = require('body-parser')
const cron = require('node-cron');
const { sendEmail } = require('./tasks');
const Joke = require('./models/joke');
const User = require('./models/user')

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
const apiRouter = require('./routes/api')

const app = express()

// Middleware
app.use(cors())
app.use(morgan('common'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// URLs
app.use('/', indexRouter)
app.use('/api', apiRouter)

// 404
app.use((req, res, next) => {
    createError(404);
  });

// cronjobs
cron.schedule('* * * * *', async () => {
    let joke = await Joke.aggregate([{ $sample: { size: 1}}])
    joke = joke.length > 0 ? joke[0] : null
    if (joke) {
        const users = await User.find({})
        for (let user of users) {
            sendEmail({
                to: user.email,
                subject: 'Cringomba! Your joke of the day',
                body: joke.text
            })
        }
    } 
});

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log('Server is listening on ' + port)
})
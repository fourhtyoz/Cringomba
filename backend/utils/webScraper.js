const mongoose = require('mongoose');
const puppeteer = require('puppeteer');
const Joke = require('../models/joke');
const dotenv = require('dotenv')
dotenv.config()

const url = process.env.JOKE_SOURCE
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

const getJokes = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        debuggingPort: null
    })

    const page = await browser.newPage()
    await page.goto(url, {
        waitUntil: 'domcontentloaded',
    })

    const jokes = await page.evaluate(() => {
        const jokeList = document.querySelectorAll('.anekdot')
        return Array.from(jokeList).map(item => {
            const jokeText = item.innerText;
            return jokeText
        })

    })
    await browser.close()

    if (jokes.length > 0) {
        connectToDB()
        jokes.forEach((item, index) => {
            console.log(`Processing: #${index}`)
            createJoke(item)
        }) 
    }
}

async function createJoke(text) {
    const joke = new Joke({text: text})
    await joke.save()
}

getJokes()

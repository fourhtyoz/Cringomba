const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const JokeAPI = require('sv443-joke-api');

const app = express()

app.use(cors())
app.use(morgan('common'))

app.get('/', async (req, res) => {
    JokeAPI.getJokes().then(data => data.json()).then(response => {
        if (response) {
            res.status(200).json(response)
        } else {
            throw new Error('no response')
        }
    }).catch(err => {
        res.status(500).send('error')
        console.log(err)
    }
    )
})

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log('Server is listening on ' + port)
})
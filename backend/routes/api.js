const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router()

router.get('/get_joke', apiController.get_joke)

module.exports = router
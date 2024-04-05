const express = require('express');
const indexController = require('../controllers/indexController');
const authController = require('../controllers/authController');
const requireAuth = require('../middlewares/requireAuth');
const { compareSync } = require('bcrypt');

const router = express.Router()

router.get('/', indexController.index)
router.post('/register', authController.register)
router.post('/login', authController.login)

router.get("/test", requireAuth, (req, res) => {
    console.log(req.user)
    res.send('hi')
  });

module.exports = router
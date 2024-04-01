const express = require('express');
const indexController = require('../controllers/indexController');
const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/authJWT');

const router = express.Router()

router.get('/', indexController.index)
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/secret', verifyToken, (req, res) => {
    console.log(req.user)
    if (!req.user) {
        return res.status(403).send({message: 'Invalid JWT token'})
    } 
    res.status(200).send({message: 'OK'})
})

module.exports = router
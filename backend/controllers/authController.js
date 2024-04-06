
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require("dotenv").config(); // Load the .env file

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
    try {
        //Extracting email and password from the req.body object
        const { email, password } = req.body;
        const JWT_SECRET = process.env.JWT_SECRET;
    
        //Checking if user exists in database
        let user = await User.findOne({ email });
    
        if (!user) {
          return res.status(401).json({ message: "Invalid email Credentials" });
        }
    
        //Comparing provided password with password retrived from database
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            const token = jwt.sign({ email }, JWT_SECRET);
            return res
              .status(200)
              .json({ message: "User Logged in Successfully", 
                user: {
                  id: user._id, 
                  firstName: user.firstName, 
                  lastName: user.lastName, 
                  email: user.email, 
                  role: user.role, 
                  created:user.created
                }, 
                token: token });
          }
    
          console.log(err);
          return res.status(401).json({ message: "Invalid Credentials" });
        });
      } catch (error) {
        res.status(401).send(err.message);
      }
    
})
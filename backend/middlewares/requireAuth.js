const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require('../models/user');
const { compareSync } = require("bcrypt");
require("dotenv").config(); // Load the .env file

module.exports = (req, res, next) => {
  console.log(1)
  const JWT_SECRET = process.env.JWT_SECRET;
  //Extracting token from authorization header
  const { authorization } = req.headers;
  console.log(authorization)
  if (!authorization) {
    console.log(2)
    return res.status(404).send({ error: "must be logged in" });
  }
  console.log(3)
  const token = authorization.replace("Bearer ", "");
  console.log(token)

  //Verifying if the token is valid.
  jwt.verify(token, JWT_SECRET, async (err, payload) => {
    console.log(4)
    if (err) {
      console.log(5, err)
      return res.status(403).send("Could not verify token");
    }
    const { email } = payload;
    console.log(6, email)
    req.user = payload;
    console.log(7, req.user)
  });
  next();
};
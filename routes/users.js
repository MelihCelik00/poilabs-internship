// importing modules
const express = require("express");
const userController = require("../components/auth/controller");
const { signup, login } = userController;
const userAuth = require("../components/auth/userAuth");

const router = express.Router();

// signup endpoint
// passing the middleware to the signup
router.post('/signup', userAuth.saveUser, signup);

// login route
router.post('/login/', login);

module.exports = router;
// importing modules
const express = require("express");
const userController = require("../components/auth/controller");
const { signup, login } = userController;
const userAuth = require("../components/auth/userAuth");

const router = express.Router();

// signup endpoint to pass the middleware to the signup
router.post('/signup', userAuth.saveUser, signup);

// login endpoint route
router.post('/login/', login);

module.exports = router;
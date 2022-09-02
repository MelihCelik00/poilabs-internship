const express = require('express');
const db = require("../../models");

// Assign db.users to User Variable
const User = db.users;

// Function to check if username or email already exist in db.
// this is for avoiding having two users with the same username and email
const saveUser = async (req, res, next) => {
    // search db with findOne (or findAll) to see if user exist
    try {
        const username = await User.findOne({
            where: {
                username : req.body.username,
            }
        });
        // if username exist in db responds with a status of 409
        if (username) {
            return res.json(409).send("username already taken")
        }

        // checking if email already exist
        const emailcheck = await User.findOne({
            where: {
                email: req.body.email, 
            }
        });

        // same as username, if email exist in db responds with a status code of 409
        if (emailcheck) {
            return res.json(409).send("Authentication failed.");
        }
        next();  // It passes control to the next matching route.

    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    saveUser,
}
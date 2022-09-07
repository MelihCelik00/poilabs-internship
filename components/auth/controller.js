// this script contains signup and login methods which are the two main functions

// import modules
var createError = require('http-errors');
const bcrypt = require("bcrypt");
const db = require("../../models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const auth = require("basic-auth");

const redisClient = require("../redis");

// assigning user to the variable User
const User = db.users;

// sign user up
const signup = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const data = {
            username,
            email,
            password: await bcrypt.hash(password, 10),  // hashing users password before its saved to the database with bcrypt
        };
        // save the user
        const user = await User.create(data);

        // if user details is captured generate token with the user's id and the secretKey in the env file
        // and set cookie with the token granted
        if (user) {  
            let token = jwt.sign({ id:user.id }, process.env.secretKey, {  // create a expirable token
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });
            return res.status(200).json(user);  // send user details
        }else{
            return res.status(406).json(createError.BadRequest());
        }
    } catch (error) {
        console.log(error);
    }
};

// login authentication
const login = async (req, res) => {
    try {
        let userAuth = auth(req);  // returns => { name: 'something', pass: 'whatever' }  // previously -> const { email, password } = req.body;
        // console.log(userAuth);  // Credentials { name: 'testmail1@testmail.com', pass: 'pwd1' }
        
        // find a user by their email
        const user = await User.findOne({
            where: {email: userAuth.name},
            attributes: ["id","username","password","email"],
        });

        // if user email is found, compare password with bycrypt
        if (user) {
            const isSame = await bcrypt.compare(userAuth.pass, user.password);
            
            if (isSame) {
                let accessToken = jwt.sign({ uid: user.id}, process.env.secretKey, {  // if password is same generate a token with the user's id and the secretKey in the env file
                    expiresIn: expireTime, // can be changed at the top of the code // 1 * 24 * 60 * 60 * 1000,
                });                
                let {password, createdAt, updatedAt, ...rest} = user.dataValues;
                user.dataValues = rest;
                user.dataValues["x-access-token"] = accessToken;  // add token as new attribute 
                
                redisClient.set(accessToken, `${user.dataValues.id}`);  // In redis, save token and id in two-way. This simplifies process of tracking the user.
                redisClient.set(`${user.dataValues.id}`, JSON.stringify({
                            "x-access-token" : accessToken,
                            expires : 60 * 10  // 10 min
                    })); // key only can be string.
                res.header("x-access-token", accessToken)
                return res.status(200).json(user.dataValues);  // Standard response for successful HTTP request with json response
            } else {
                return res.status(401).json(createError.Unauthorized());
            }
        } else {
            return res.status(401).json(createError.Unauthorized());
        }
    } catch (error) {
        console.log(error);
    }
};

const logout = async (req, res, next) => {
    try {
        let userAuth = auth(req);
        const user = await User.findOne({
            where: {email: userAuth.name},
            attributes: ["id"],
        });
        redisClient.get(user.id, function(err, reply) {
            let replyJSON  = JSON.parse(reply);
            redisClient.del(replyJSON.accessToken);
          });
        redisClient.del(user.id);
        return res.status(200);
    } catch (error) {
        console.log(error);
    }
};


// Export auth modules.
module.exports = {
    signup,
    login,
    logout,
};
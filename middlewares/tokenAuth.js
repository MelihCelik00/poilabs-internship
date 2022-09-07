/*
This middleware is used for authorization of the user. 
Controls the data from redis and due to token expiration time, authenticates the user.
*/

const redisClient = require("../components/redis");
const config = require("../config/config")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const tokenAuth = (req, res, next) => {
    /* We need req headers for a access to token */
    console.log("x-access-token: ", req.headers["x-access-token"]);  // returns token
    console.log("USER ID: ", req.headers.id); // returns user id

    let token = req.headers["x-access-token"];
      /*
       * TODO:
            Implement redis tokens-user token comparison and validation
            If user log in from different source, disable auth of older token
       *
       *   */ 
    if (token) {
        jwt.verify(token, process.env.secretKey, function(err, decoded) {
            if (err) {
                console.log("ERR::: ", err);
                return res.status(401).json({ "error": true, "message": 'Unauthorized access.', "err": err });
            }else{
                // Check redis
                currentValidToken = redisClient.get(req.headers.id)
                console.log("Current Valid Token: ", currentValidToken);
                req.decoded = decoded;
                next();
                return res.status(200).next();
            }
        });
    } else {
        return res.status(403).send({
            "error" : true,
            "message" : "No token provided."
        });
    }
};

module.exports = {
    tokenAuth,
};
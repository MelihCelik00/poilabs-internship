/*
This middleware is used for authorization of the user. 
Controls the data from redis and due to token expiration time, authenticates the user.
*/

const redisClient = require("../components/redis");
const config = require("../config/config")
const jwt = require("jsonwebtoken");

const tokenAuth = (req, res, next) => {
    /* We need req headers for a access to token */
    console.log(req.headers["x-access-token"]);  // test
    res.status(200).json(req)  // test
    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.status(401).json({ "error": true, "message": 'Unauthorized access.' });
            }
            req.decoded = decoded;
            next();
            return res.status(200);
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
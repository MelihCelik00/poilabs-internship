/*
This middleware is used for authorization of the user. 
Controls the data from redis and due to token expiration time, authenticates the user.
*/

const redisClient = require("../components/redis");
var createError = require('http-errors');
const jwt = require("jsonwebtoken");

const tokenAuth = async (req, res, next) => {
    // req.headers["x-access-token"] // returns token
    // req.headers.id) // returns user id
    let token = req.headers["x-access-token"];
      /** 
        TODO:
            Implement redis tokens-user token comparison and validation
            If user log in from different source, disable the auth of older token
       **/ 
    if (token) {
        
        const getIdFromToken = await redisClient.get(token);
        console.log(getIdFromToken);
        const getTokenFromId = await redisClient.get(getIdFromToken)
        let parsedRedisTokenValue =  JSON.parse(getTokenFromId)
        let tokenFromId = parsedRedisTokenValue["x-access-token"];
        console.log(tokenFromId);
        console.log("TOKENFROMID: ",tokenFromId);
        if (token === tokenFromId) {
            next();
        } else {
            await redisClient.del(token)
            return res.status(401).json(createError.Unauthorized());
        }



        // const currentActiveTokenInfo = redisClient.get(req.headers.id).then(
        //     reply => {
        //         let redisJsonVal = JSON.parse(reply);
        //         let redisToken = redisJsonVal["x-access-token"];
        //         if (token == redisToken) {
        //             console.log("Tokens are matching! ");
        //             next();
        //         } else {  // if jwt token is not stored in the redis db in related user id
        //             redisClient.del(token).then(res.status(401).json(createError.Unauthorized()));
        //         }
        // });
            // redisClient.del(redisJsonVal["x-access-token"]);
        
        
        // if (token) {
        // jwt.verify(token, process.env.secretKey, function(err, decoded) {
        //     if (err) {  // mostly err.msg returns ExpiredTokenError in error-occured case.
        //         return res.status(401).json(createError.Unauthorized());
        //         //return res.status(401).json({ "error": true, "message": 'Unauthorized access.', "err": err });
        //     }else{
        //          req.decoded = decoded;
        //          next();
        //     }
        // });
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
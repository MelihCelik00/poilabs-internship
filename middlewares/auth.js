/*
This middleware is used for authorization of the user. 
Controls the data from redis and due to token expiration time, authenticates the user.
*/

const redisClient = require("../components/redis");

const authUserFromRedis = async ( req, res ) => {
    
};
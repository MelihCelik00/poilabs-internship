const redis = require("redis");
const bodyParser = require("body-parser");

const REDIS_PORT = process.env.REDIS_PORT;

// const redisClient = redis.createClient();  // default format of createClient() should have connect to localhost on port 6379

const redisClient = redis.createClient({
    host: "127.0.0.1",
    port: 6379,
    //url: 'redis://localhost:6379'
  });

  (async () => {
    await redisClient.connect(); // connect is a async function.
  })();
  console.log(redisClient.isOpen);  // even is open returns true there is a error
  
  redisClient.on("error", (err) => {
      console.log("Could not establish a connection with redis!");
      console.log(err);
  });
  redisClient.on("connect", (err) => {
      console.log("Connected to redis successfully!!!");
  });

  module.exports = redisClient;
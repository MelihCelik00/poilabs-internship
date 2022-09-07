const express = require("express");
const router = express.Router();
const exampleService = require("../components/microservice/exampleService")
const { exService } = exampleService

router.get('/orders/', exService);

module.exports = router;
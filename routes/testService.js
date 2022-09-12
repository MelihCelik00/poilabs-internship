const express = require("express");
const router = express.Router();
const exampleService = require("../components/microservice/exampleService")
const { exService } = exampleService

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      ApiKeyAuth:
 *          type: apiKey
 *          in: header
 *          name: x-API-KEY
 * schemas:
 *      Microservice:
 *          type: object
 *          required:
 *              - 
 *          properties:
 *              
 *          
 */

/**
 * @swagger
 * /api/services/orders:
 *      get:
 *          summary: Example get CRUD service
 *          tags: []
 *          responses:
 *              '200':
 *                  description: Successful operation
 *              500:
 *                  description: Some server error.
 */

router.get('/orders/', exService);

module.exports = router;
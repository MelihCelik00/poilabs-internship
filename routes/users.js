// importing modules
const express = require("express");
const userController = require("../components/auth/controller");
const { signup, login, logout } = userController;
const userAuth = require("../components/auth/userAuth");

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - username
 *              - email
 *              - password
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Auto generated id
 *              username:
 *                  type: string
 *                  description: Username which is created by the user
 *              password:
 *                  type: string
 *                  description: User password
 *              email:
 *                  type: string
 *                  description: Signed email of user
 *              createdAt:
 *                  type: string
 *                  description: Auto generated date that user signed up
 *              updatedAt:
 *                  type: string
 *                  description: Auto updated date if user information has changed
 *          example:
 *              id: 1
 *              username: testuser1
 *              password: pwd1
 *              email: testuser@mail.com
 *              createdAt: 2022-09-05 10:56:33.499+03
 *              updatedAt: 2022-09-05 10:56:33.499+03
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: User Authorization managing API
 */

/**
 * @swagger
 * /api/users/signup:
 *      post:
 *          summary: Create a new user
 *          tags: [Users]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          
 *          responses:
 *              200:
 *                  description: The user has created successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/User'
 *              500:
 *                  description: Some server error
 */

// signup endpoint to pass the middleware to the signup
router.post('/signup/', userAuth.saveUser, signup);

/**
 * @swagger
 * /api/users/login:
 *      post:
 *          summary: Log in existing user
 *          tags: [Users, Security]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          responses:
 *              200:
 *                  description: The user login successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/User'
 *              500:
 *                  description: Some server error
 */

// login endpoint route
router.post('/login/', login);

router.post('/logout/', logout);

module.exports = router;
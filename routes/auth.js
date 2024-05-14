const express = require('express');
const init = express.Router();
const {register,login} = require('../controllers/authController')

/**
 * @typedef RegisterRequest
 * @property {string} username.required - Username of the user
 * @property {string} email.required - Email of the user
 * @property {string} password.required - Password of the user
 * @property {string} [role] - Role of the user
 */

/**
 * @typedef User
 * @property {string} _id - User ID
 * @property {string} username - Username of the user
 * @property {string} email - Email of the user
 * @property {string} role - Role of the user
 */

/**
 * Register a new user
 * @route POST /register
 * @group Authentication - Operations for user authentication
 * @param {RegisterRequest.model} register.body.required - New user information
 * @returns {User.model} 201 - User registered successfully
 * @produces application/json
 * @consumes application/json
 * @response 400 - Bad request. Invalid input data
 * @response 404 - Email already exists
 * @response 500 - Internal server error
 */

init.post('/register', register)

 

/**
 * @typedef LoginRequest
 * @property {string} email.required - Email of the user
 * @property {string} password.required - Password of the user
 */

/**
 * @typedef AuthResponse
 * @property {string} token - JWT token for authentication
 */

/**
 * Authenticate user
 * @route POST /login
 * @group Authentication - Operations for user authentication
 * @param {LoginRequest.model} login.body.required - User login credentials
 * @returns {AuthResponse.model} 200 - User authenticated successfully
 * @produces application/json
 * @consumes application/json
 * @response 400 - Bad request. Invalid input data
 * @response 401 - Invalid credentials
 * @response 404 - User not found
 * @response 500 - Internal server error
 */


init.use('/login', login)

module.exports = init

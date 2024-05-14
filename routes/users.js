const express = require('express');
const init = express.Router();
const { updateUserProfile,getUserProfile,getAllUsers } = require('../controllers/userController')
const {authenticateUser,hasPermission,isAdmin} = require('../middleware/middlewares')

/**
 * @typedef UserProfile
 * @property {string} _id - User ID
 * @property {string} username - Username of the user
 * @property {string} email - Email of the user
 * @property {string} role - Role of the user
 */

/**
 * Get user profile
 * @route GET /
 * @group Users - Operations related to users
 * @produces application/json
 * @returns {UserProfile.model} 200 - User profile retrieved successfully
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - Internal server error
 */

init.get('/', authenticateUser,hasPermission('read'),getUserProfile)



/**
 * @typedef UpdateProfileRequest
 * @property {string} [username] - New username
 * @property {string} [email] - New email
 * @property {string} [password] - New password
 */

/**
 * Update user profile
 * @route PUT /
 * @group Users - Operations related to users
 * @param {UpdateProfileRequest.model} updateProfile.body.required - Updated user profile
 * @produces application/json
 * @returns {UserProfile.model} 200 - User profile updated successfully
 * @returns {Error} 404 - User not found
 * @returns {Error} 500 - Internal server error
 */


init.put('/',authenticateUser,hasPermission('update'), updateUserProfile)


/**
 * @typedef User
 * @property {string} _id - User ID
 * @property {string} username - Username of the user
 * @property {string} email - Email of the user
 * @property {string} role - Role of the user
 */

/**
 * Get all users
 * @route GET /
 * @group Users - Operations related to users
 * @produces application/json
 * @returns {Array.<User>} 200 - List of users
 * @returns {Error} 404 - No users found
 * @returns {Error} 500 - Internal server error
 */

init.get('/get-all',authenticateUser, hasPermission('read'),isAdmin,getAllUsers)


module.exports = init

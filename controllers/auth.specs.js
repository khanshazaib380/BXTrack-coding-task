const Joi = require('joi');

// Define JOI schema for registration request body
const registerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(), // Minimum 6 characters
    role: Joi.string().optional(),

});

// Define JOI schema for login request body
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = { registerSchema, loginSchema };

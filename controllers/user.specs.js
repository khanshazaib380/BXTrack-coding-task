const Joi = require('joi');

const updateUserProfileSchema = Joi.object({
    username: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional() // Minimum 6 characters
});
module.exports = { updateUserProfileSchema };

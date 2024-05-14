const Joi = require('joi');

// Define JOI schema for creating a role
const createRoleSchema = Joi.object({
    roleName: Joi.string().required(),
    permissions: Joi.array().items(Joi.string()).required()
});

// Define JOI schema for updating a role
const updateRoleSchema = Joi.object({
    roleName: Joi.string(),
    permissions: Joi.array().items(Joi.string())
});

module.exports = { createRoleSchema, updateRoleSchema };

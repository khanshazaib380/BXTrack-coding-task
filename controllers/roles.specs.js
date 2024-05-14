const Joi = require('joi');

// Define JOI schema for creating a new role
const createRoleSchema = Joi.object({
    roleName: Joi.string().required(),
    endpoints: Joi.array().items(
        Joi.object({
            route: Joi.string().required(),
            permissions: Joi.object({
                create: Joi.boolean().default(false),
                read: Joi.boolean().default(false),
                update: Joi.boolean().default(false),
                delete: Joi.boolean().default(false)
            }).default({})
        })
    ).required()
});

// Define JOI schema for updating an existing role
const updateRoleSchema = Joi.object({
    roleName: Joi.string(),
    endpoints: Joi.array().items(
        Joi.object({
            route: Joi.string().required(),
            permissions: Joi.object({
                create: Joi.boolean().default(false),
                read: Joi.boolean().default(false),
                update: Joi.boolean().default(false),
                delete: Joi.boolean().default(false)
            }).default({})
        })
    )
});

module.exports = { createRoleSchema, updateRoleSchema };




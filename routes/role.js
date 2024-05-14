const express = require('express');
const init = express.Router();
const {authenticateUser, hasPermission,isAdmin } = require('../middleware/middlewares')

const {createRole,
    getAllRoles,
    getRoleById,
    updateRoleById,
    deleteRoleById,assignRoleToUser} = require('../controllers/rolesController')





// Route for creating a new role
/**
 * @typedef CreateRoleRequest
 * @property {string} roleName.required - Name of the role
 * @property {Array.<string>} permissions.required - Permissions of the role
 */

/**
 * Create a new role
 * @route POST /
 * @group Roles - Operations related to roles
 * @param {CreateRoleRequest.model} createRole.body.required - Role information
 * @produces application/json
 * @returns {Role.model} 201 - Role created successfully
 * @returns {Error} 400 - Bad request
 * @returns {Error} 500 - Internal server error
 */

init.post('/',authenticateUser,isAdmin, hasPermission('create'),createRole);






// Route for getting all roles
/**
 * @typedef Role
 * @property {string} _id - Role ID
 * @property {string} roleName - Name of the role
 * @property {Array.<string>} permissions - Permissions of the role
 */

/**
 * Get all roles
 * @route GET /
 * @group Roles - Operations related to roles
 * @produces application/json
 * @returns {Array.<Role>} 200 - List of roles
 * @returns {Error} 500 - Internal server error
 */

init.get('/',authenticateUser,isAdmin, hasPermission('read'), getAllRoles);





// Route for getting a single role by ID
/**
 * Get a single role by ID
 * @route GET /:id
 * @group Roles - Operations related to roles
 * @param {string} id.path.required - Role ID
 * @produces application/json
 * @returns {Role.model} 200 - Role retrieved successfully
 * @returns {Error} 404 - Role not found
 * @returns {Error} 500 - Internal server error
 */

init.get('/:id',authenticateUser,isAdmin, hasPermission('read'), getRoleById);






// Route for updating a role by ID
/**
 * @typedef UpdateRoleRequest
 * @property {string} roleName - Updated name of the role
 * @property {Array.<string>} permissions - Updated permissions of the role
 */

/**
 * Update a role by ID
 * @route PUT /:id
 * @group Roles - Operations related to roles
 * @param {string} id.path.required - Role ID
 * @param {UpdateRoleRequest.model} updateRole.body.required - Updated role information
 * @produces application/json
 * @returns {Role.model} 200 - Role updated successfully
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Role not found
 * @returns {Error} 500 - Internal server error
 */

init.put('/:id',authenticateUser,isAdmin, hasPermission('update'), updateRoleById);








// Route for deleting a role by ID
/**
 * Delete a role by ID
 * @route DELETE /:id
 * @group Roles - Operations related to roles
 * @param {string} id.path.required - Role ID
 * @produces application/json
 * @returns {Role.model} 200 - Role deleted successfully
 * @returns {Error} 404 - Role not found
 * @returns {Error} 500 - Internal server error
 */

init.delete('/:id',authenticateUser,isAdmin, hasPermission('delete'), deleteRoleById);


// Route for assigning a role to a user
/**
 * assign a role to a user
 * @route POST /assign-role
 * @group Roles - Operations related to roles
 * @param {string} id.path.required - roleId
 * * @param {string} id.path.required - userId
 * @produces application/json
 * @returns {Role.model} 200 - Role assigned successfully
 * @returns {Error} 404 - Role not found
 * @returns {Error} 500 - Internal server error
 */

init.post('/assign-role',authenticateUser,isAdmin, hasPermission('update'), assignRoleToUser);



module.exports = init

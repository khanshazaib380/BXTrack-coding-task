const Role = require('../models/Roles');
const { createRoleSchema, updateRoleSchema } = require('./roles.specs');
const User = require('../models/Users');

// Create a new role
const createRole = async (req, res) => {
    try {
        const { error, value } = createRoleSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ code: 400, success: false, message: error.details[0].message, data: null });
        }

        const newRole = new Role(value);
        await newRole.save();
        res.status(201).json({ code: 200, success: true, message: 'Role created successfully', data: newRole });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, success: false, message: error.message, error: error.message });
    }
};

// Get all roles
const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json({ code: 200, success: true, message: 'Roles retrieved successfully', data: roles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, success: false, message: error.message, error: error.message });
    }
};

// Get a single role by ID
const getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ code: 404, success: false, message: 'Role not found' });
        }
        res.status(200).json({ code: 200, success: true, message: 'Role retrieved successfully', data: role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, success: false, message: error.message, error: error.message });
    }
};

// Update a role by ID
const updateRoleById = async (req, res) => {
    try {
        const { error, value } = updateRoleSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ code: 400, success: false, message: error.details[0].message, data: null });
        }

        const updatedRole = await Role.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!updatedRole) {
            return res.status(404).json({ success: false, message: 'Role not found' });
        }
        res.status(200).json({ code: 200, success: true, message: 'Role updated successfully', data: updatedRole });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, success: false, message: error.message, error: error.message });
    }
};

// Delete a role by ID
const deleteRoleById = async (req, res) => {
    try {
        const deletedRole = await Role.findByIdAndDelete(req.params.id);
        if (!deletedRole) {
            return res.status(404).json({ code: 404, success: false, message: 'Role not found' });
        }
        res.status(200).json({ code: 200, success: true, message: 'Role deleted successfully', data: deletedRole });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, success: false, message: error.message, error: error.message });
    }
};

// Assign role to user
const assignRoleToUser = async (req, res) => {
    try {
        const { userId, roleId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ code: 404, success: false, message: 'User not found' });
        }

        const role = await Role.findById(roleId);
        if (!role) {
            return res.status(404).json({ code: 404, success: false, message: 'Role not found' });
        }

        user.role = roleId;
        await user.save();

        res.status(200).json({ code: 200, success: true, message: 'Role assigned to user successfully', data: { user, role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, success: false, message: error.message, error: error.message });
    }
};

module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRoleById,
    deleteRoleById,
    assignRoleToUser
};

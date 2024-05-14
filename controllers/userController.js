const bcrypt = require('bcryptjs');
const User = require('../models/Users');
const { updateUserProfileSchema } = require('./user.specs');


// GET /api/users
// Get all users
const getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find().select('-password').populate('role');

        // Check if any users are found
        if (!users || users.length === 0) {
            return res.status(404).json({ code: 404, success: false, message: "No users found.", data: null });
        }

        // Return the list of users
        res.status(200).json({ code: 200, success: true, message: "Users retrieved successfully.", data: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, success: false, message: "Internal server error.", data: null });
    }
};




// GET /api/user-profile
// Get user profile
const getUserProfile = async (req, res) => {
    try {
        // Extract user ID from token
        const userId = req.user.userId;
        if(!userId){
            return res.status(400).json({ code: 400, success: false, message: "provide userId", data: null });

        }
        // Find user by ID
        const user = await User.findById(userId).select('-password').populate('role');
        if (!user) {
            return res.status(404).json({ code: 404, success: false, message: "User not found.", data: null });
        }

        res.status(200).json({ code: 200, success: true, message: "User profile retrieved successfully.", data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, success: false, message: error.message, data: null });
    }
};




// PUT /api/update-profile
// Update user profile
const updateUserProfile = async (req, res) => {
    try {

        const { error, value } = updateUserProfileSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ code: 400, success: false, message: error.details[0].message, data: null });
        }
        // Extract user ID from token
        const userId = req.user.userId;
        if(!userId){
            return res.status(400).json({ code: 400, success: false, message: "provide userId", data: null });

        }

        // Extract updated fields from request body
        const { username, email, password } = req.body;

        // Find user by ID
        let user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ code: 404, success: false, message: "User not found.", data: null });
        }

        // Update user fields
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) {
            // Hash the new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        // Save updated user
        await user.save();
         user = await User.findById(userId).select('-password').populate('role');

        res.status(200).json({ code: 200, success: true, message: "User profile updated successfully.", data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, success: false, message: error.message, data: null });
    }
};






module.exports = {
    getAllUsers,
    getUserProfile,
    updateUserProfile,
    
};



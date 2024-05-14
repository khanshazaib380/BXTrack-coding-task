const bcrypt = require('bcryptjs');
const User = require('../models/Users');
const Role = require('../models/Roles');

const srvConfig = require('../config');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('./auth.specs');

// POST /api/register
// Allow new users to register
const register = async (req, res) => {
    try {
        // Validate request body using JOI schema
        const { error, value } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ code: 400, success: false, message: error.details[0].message, data: null });
        }

        const { username, email, password,role } = value;
        let assigndefaultRole=srvConfig.defaultRole;

        if(role){
            assigndefaultRole=role;
        }

        // Check if the email is already registered
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ code: 400, success: false, message: "Email already exists.", data: null });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Retrieve the default role from the database
        const defaultRole = await Role.findOne({ roleName: assigndefaultRole }); // Adjust the query according to your schema

        if (!defaultRole) {
            return res.status(404).json({ code: 404, success: false, message: "Default role not found.", data: null });
        }
console.log("defaultRole:  ", defaultRole)
        // Create a new user with the default role
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: defaultRole._id // Assign the role ID to the user
        });

        // Save the user to the database
        await newUser.save();
         existingUser = await User.findOne({ email }).select('-password').populate('role');


        res.status(201).json({ code: 201, success: true, message: "User registered successfully.", data: existingUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, success: false, message: error.message, data: null });
    }
};


// POST /api/login
// Authenticate users
const login = async (req, res) => {
    try {
        // Validate request body using JOI schema
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ code: 400, success: false, message: error.details[0].message, data: null });
        }

        const { email, password } = value;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ code: 404, success: false, message: "User not found.", data: null });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ code: 401, success: false, message: "Invalid credentials.", data: null });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, srvConfig.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ code: 200, success: true, message: "User authenticated successfully.", data: { token } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, success: false, message: error.message, data: null });
    }
};

module.exports = {
    register,
    login,
};





const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const config = require('../config');
const Roles = require('../models/Roles');

// Middleware to verify user authentication
const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    // Check if the user exists
    const user = await User.findById(decoded.userId).populate("role");
    req.user.permissions = user.role.permissions;


    if (!user) return res.status(404).json({ message: 'User not found.' });
    
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// Middleware to check if user has permission
const hasPermission = (permission) => {
  
    return (req, res, next) => {
      console.log("req.user:  ",req.user)
        // Check if user has required permission
        if (req.user && req.user.permissions && req.user.permissions.includes(permission)) {
            next(); // Allow access if user has required permission
        } else {
            res.status(403).json({ code: 403, success: false, message: "Access forbidden. You don't have permission to perform this operation.", data: null });
        }
    };
};

const isAdmin = (req, res, next) => {
  // Check if user has admin role
  if (req.user && req.user.role && req.user.role.roleName === 'Admin') {
      next(); // Allow access if user is admin
  } else {
      res.status(403).json({ code: 403, success: false, message: "Access forbidden. You must be an admin to perform this operation.", data: null });
  }
};

module.exports = { authenticateUser, hasPermission,isAdmin };

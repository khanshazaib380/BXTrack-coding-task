

const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const config = require('../config');
const Roles = require('../models/Roles');

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      req.user = decoded;
      const user = await User.findById(decoded.userId).populate("role");
      req.user.role = user.role; // Attach user's role to the request

      if (!user) return res.status(404).json({ message: 'User not found.' });

      next();
  } catch (ex) {
      res.status(400).json({ message: 'Invalid token.' });
  }
};




const hasPermission = (permission) => {
  return (req, res, next) => {
      const userRole = req.user.role;
      const endpointParts = req.originalUrl.split('/');
      const baseRoute = `/${endpointParts[1]}/${endpointParts[2]}`; // Extract base route
      
      console.log("req.user: ", JSON.stringify(req.user))
      console.log("endpoint: ", req.originalUrl);
      
      if (!userRole) {
          return res.status(403).json({ code: 403, success: false, message: "Access forbidden. User role not found.", data: null });
      }

      const endpointPermission = userRole.endpoints.find(ep => ep.route === baseRoute);

      if (!endpointPermission) {
          return res.status(403).json({ code: 403, success: false, message: "Access forbidden. Endpoint not found in user's role.", data: null });
      }

      if (!endpointPermission.permissions[permission]) {
          return res.status(403).json({ code: 403, success: false, message: `Access forbidden. User doesn't have ${permission} permission for this endpoint.`, data: null });
      }

      next();
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

// rateLimiters.js

const rateLimit = require('express-rate-limit');
const config = require('../config');

// Define API-based rate limiter
const apiLimiter = rateLimit({
    rateLimitDuration: 1000, // 1 second in milliseconds
    rateLimitMaxRequests: 100,
  message: 'Too many requests from this API, please try again later.'
});

// Define IP-based rate limiter
const ipLimiter = rateLimit({
    rateLimitDuration: 1000, // 1 second in milliseconds
    rateLimitMaxRequests: 100,
  message: 'Too many requests from this IP, please try again later.'
});

module.exports = { apiLimiter, ipLimiter };

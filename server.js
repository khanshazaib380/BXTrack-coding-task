'use strict';
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./database/db'); // Import the database connection function
const srvConfig = require('./config');
const expressSwagger = require('express-swagger-generator')(app);
const fs = require('fs'); // Import fs module for file operations
const { apiLimiter, ipLimiter }= require('./middleware/rateLimiters')


let httpServer;

/**
 * Configure middleware
 */


  // Apply the IP-based rate limiter to all requests
  app.use(ipLimiter);

app.use(
    cors({
        // origin: `http://localhost:${srvConfig.SERVER_PORT}`,
        origin: function (origin, callback) {
            return callback(null, true)
        },
        optionsSuccessStatus: 200,
        credentials: true
    }),
    bodyParser.json()
);

/**
 * Include all API Routes
 */
app.use('/api/auth', apiLimiter,require('./routes/auth'));
app.use('/api/users',apiLimiter, require('./routes/users'));
app.use('/api/roles', require('./routes/role'));


/**
 * Swagger UI documentation
 */
if (srvConfig.SWAGGER_SETTINGS.enableSwaggerUI)
    expressSwagger(srvConfig.SWAGGER_SETTINGS);

/**
 * Connect to MongoDB
 */
connectDB().then( () => {
    /**
     * Configure http(s)Server
     */
    if (srvConfig.HTTPS_ENABLED) {
        const privateKey = fs.readFileSync(srvConfig.PRIVATE_KEY_PATH, 'utf8');
        const certificate = fs.readFileSync(srvConfig.CERTIFICATE_PATH, 'utf8');
        const ca = fs.readFileSync(srvConfig.CA_PATH, 'utf8');

        // Create a HTTPS server
        httpServer = https.createServer({ key: privateKey, cert: certificate, ca: ca }, app);
    } else {
        // Create a HTTP server
        httpServer = http.createServer({}, app);
    }

    /**
     * Start http server
     */
    httpServer.listen(srvConfig.SERVER_PORT, () => {
        console.log(`Server started on port  ${srvConfig.SERVER_PORT}`);
    });
}).catch(err => {
    console.error('MongoDB connection failed:', err);
    process.exit(1); // Exit the process with failure
});            




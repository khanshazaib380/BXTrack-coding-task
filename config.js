// /**
//  * Web server port
//  */
// const SERVER_PORT = 3005;


// /**
//  * MongoDB connection string

//  */

// const MONGODB_URI = "mongodb://localhost:27017";


// /**
// JWT Secret 
//  */

// JWT_SECRET='lkjhbvcftyjmnbvcfdfghjknbv'


// /**
//  default user role
//  */

// const defaultRole= 'User';


// /**
//  default admin credentials
//  */

//  const adminEmail='admin@gmail.com'
//  const adminPassword='123456'

// /**

//  * 
//  * SSL / HTTPS settings
//  * ------------------------
//  * if HTTPS is true, the PRIVATE_KEY_PATH, CERTIFICATE_PATH and CA_PATH MUST be correctly located.
//  *
//  * PRIVATE_KEY_PATH is the path where the privkey.pem file is located
//  * CERTIFICATE_PATH is the path where the cert.pem file is located
//  * CA_PATH is the path where the chain.pem file is located
//  */
// const HTTPS_ENABLED = false;
// const PRIVATE_KEY_PATH = '/opt/psa/var/modules/letsencrypt/etc/live/YOUR-DOMAIN-NAME.com/privkey.pem';
// const CERTIFICATE_PATH = '/opt/psa/var/modules/letsencrypt/etc/live/YOUR-DOMAIN-NAME.com/cert.pem';
// const CA_PATH = '/opt/psa/var/modules/letsencrypt/etc/live/YOUR-DOMAIN-NAME.com/chain.pem';

// /**
//  * Swagger UI settings
//  * ------------------------
//  * Swagger UI is a collection of HTML, Javascript, and CSS assets
//  * that dynamically generate beautiful documentation from a Swagger-compliant API.
//  *
//  * You can visit the Swagger API documentation on /api-docs
//  * Example: http://localhost:3005/api-docs/
//  */
// const SWAGGER_SETTINGS = {
//     enableSwaggerUI: true,
//     swaggerDefinition: {
//         info: {
//             title: 'BXTrack coding task',
//             description: ' BXTrack coding task API documentation.',
//         },
//         basePath: '/',
//         produces: [
//             "application/json"
//         ],
//         schemes: ['http', 'https'],
//     },
//     basedir: __dirname, //app absolute path
//     files: ['./routes/**/*.js'] //Path to the API handle folder
// };

// module.exports = {
//     SERVER_PORT,
//     MONGODB_URI,
//     HTTPS_ENABLED,
//     PRIVATE_KEY_PATH,
//     CERTIFICATE_PATH,
//     CA_PATH,
//     SWAGGER_SETTINGS,
//     JWT_SECRET,
//     defaultRole,
//     adminEmail,
//     adminPassword
// };


// config.js

require('dotenv').config();

const SERVER_PORT = process.env.SERVER_PORT || 3005;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const JWT_SECRET = process.env.JWT_SECRET || 'lkjhbvcftyjmnbvcfdfghjknbv';
const defaultRole = process.env.defaultRole || 'User';
const adminEmail = process.env.adminEmail || 'admin@gmail.com';
const adminPassword = process.env.adminPassword || '123456';
const HTTPS_ENABLED = process.env.HTTPS_ENABLED === 'true' || false;
const PRIVATE_KEY_PATH = process.env.PRIVATE_KEY_PATH || '/opt/psa/var/modules/letsencrypt/etc/live/YOUR-DOMAIN-NAME.com/privkey.pem';
const CERTIFICATE_PATH = process.env.CERTIFICATE_PATH || '/opt/psa/var/modules/letsencrypt/etc/live/YOUR-DOMAIN-NAME.com/cert.pem';
const CA_PATH = process.env.CA_PATH || '/opt/psa/var/modules/letsencrypt/etc/live/YOUR-DOMAIN-NAME.com/chain.pem';

const SWAGGER_SETTINGS = {
    enableSwaggerUI: true,
    swaggerDefinition: {
        info: {
            title: 'BXTrack coding task',
            description: ' BXTrack coding task API documentation.',
        },
        basePath: '/',
        produces: [
            "application/json"
        ],
        schemes: ['http', 'https'],
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
};

module.exports = {
    SERVER_PORT,
    MONGODB_URI,
    JWT_SECRET,
    defaultRole,
    adminEmail,
    adminPassword,
    HTTPS_ENABLED,
    PRIVATE_KEY_PATH,
    CERTIFICATE_PATH,
    CA_PATH,
    SWAGGER_SETTINGS,
};

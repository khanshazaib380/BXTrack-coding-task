// config/database.js

const mongoose = require('mongoose');
const srvConfig = require('../config');
const {MONGODB_URI } = srvConfig;

async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit the process with failure
    }
}


module.exports = connectDB;

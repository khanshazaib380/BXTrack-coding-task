const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true,
        unique: true
    },
    endpoints: [{
        route: {
            type: String,
            required: true
        },
        permissions: {
            create: {
                type: Boolean,
                default: false
            },
            read: {
                type: Boolean,
                default: false
            },
            update: {
                type: Boolean,
                default: false
            },
            delete: {
                type: Boolean,
                default: false
            }
        }
    }]
});

module.exports = mongoose.model('Role', roleSchema);

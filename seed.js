const mongoose = require('mongoose');
const Role = require('./models/Roles');
const User = require('./models/Users');
const srvConfig = require('./config');
const bcrypt = require('bcrypt');

// MongoDB connection setup
async function connectToMongoDB() {
  try {
    await mongoose.connect(srvConfig.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (err) {
    console.error('MongoDB connection error while seeding :', err);
    process.exit(1); // Exit process with error code 1
  }
}

// Define default roles
const defaultRoles = [
  { 
    roleName: 'Admin', 
    endpoints: [
      { route: '/api/users', permissions: { create: true, read: true, update: true, delete: true } },
      { route: '/api/roles', permissions: { create: true, read: true, update: true, delete: true } }
    ]
  },
  { 
    roleName: 'User', 
    endpoints: [
      { route: '/api/users', permissions: { create: true, read: true, update: true, delete: true } }
    ]
  },
  { 
    roleName: 'Guest', 
    endpoints: [
      { route: '/api/users', permissions: { read: true } }
    ]
  },
];
// Seed roles to the database
async function seedRoles() {
  try {
    // Check if roles already exist
    const existingRoles = await Role.find();
    if (existingRoles.length > 0) {
      console.log('Roles already exist. Skipping seeding.');
      return;
    }
    // Create default roles
    await Role.create(defaultRoles);
    console.log('Roles seeded successfully');
  } catch (error) {
    console.error('Error seeding roles:', error);
    process.exit(1); // Exit process with error code 1
  }
}

// Seed an admin user with role 'Admin'
async function seedAdminUser() {
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({}).populate('role', 'roleName');
    if (existingAdmin && existingAdmin.role.roleName === 'Admin') {
      console.log('Admin user already exists. Skipping seeding.');
      return;
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(srvConfig.adminPassword, 10); // Replace 'admin123' with your desired admin password
    // Find the 'Admin' role
    const adminRole = await Role.findOne({ roleName: 'Admin' });
    if (!adminRole) {
      console.error('Admin role not found. Please ensure the role has been seeded.');
      process.exit(1); // Exit process with error code 1
    }
    // Create admin user
    const adminUser = new User({
      username: 'admin',
      email: srvConfig.adminEmail,
      password: hashedPassword,
      role: adminRole._id // Assign the ObjectId of the 'Admin' role
    });
    await adminUser.save();
    console.log('Admin user seeded successfully');
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1); // Exit process with error code 1
  } finally {
    // Close MongoDB connection
    mongoose.disconnect();
  }
}



// Main function to seed roles and admin user
async function seedDatabase() {
  await connectToMongoDB();
  await seedRoles();
  await seedAdminUser();
  // Exit process with success code 0
  process.exit(0);
}

// Call the main function to seed the database
seedDatabase();
module.exports = seedDatabase;





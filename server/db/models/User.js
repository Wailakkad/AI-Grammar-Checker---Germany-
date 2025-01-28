const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Example password length validation
  },
  role: {
    type: String,
    enum: ['student', 'admin'], // Define user roles
    default: 'student'
  },
  phone: {
    type: String,
    required: false, // Optional field
    trim: true,
  },
  address: {
    type: String,
    required: false, // Optional field
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the User Model
const User = mongoose.model('User', userSchema);

// Export the User Model
module.exports = User;

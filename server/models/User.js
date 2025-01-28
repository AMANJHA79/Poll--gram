const mongoose = require('mongoose');
const validator = require('validator');

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name:{
        type: String,
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters'],
      },
    // Basic Information
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      validator: [validator.isEmail, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },

    // Profile Information
    profilePicture: {
      type: String,
      default: '', // Default profile picture URL
    },
    bio: {
      type: String,
      default: '',
      maxlength: [150, 'Bio cannot exceed 150 characters'],
    },
    isPrivate: {
      type: Boolean,
      default: false, // Public account by default
    },

    // Followers and Following
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to other users
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to other users
      },
    ],

    // Account Verification
    isVerified: {
      type: Boolean,
      default: false, // Email verification status
    },
    verificationToken: {
      type: String,
      default: '', // Token for email verification
    },
    verificationTokenExpireAt:{
        type: Date,
        default: null, // Expiry time for email verification token
    },

    // Password Reset
    resetPasswordToken: {
      type: String,
      default: '', // Token for password reset
    },
    resetPasswordExpires: {
      type: Date,
      default: null, // Expiry time for password reset token
    },

    // Timestamps
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },

    // Role
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      required: true
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

module.exports = mongoose.model('User', userSchema);
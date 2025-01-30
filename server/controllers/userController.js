const User = require("../models/User");
const Post = require("../models/Post");
const cloudinary = require('../config/cloudinary'); // Import Cloudinary configuration



// Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ 
      _id: { $ne: req.user._id }, 
      role: { $ne: "admin" } // Exclude admin users
    });
    res.status(200).send({
      success: true,
      users
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      error: "error while fetching All users" 
    });
  }
};



// Get a specific user's profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); // Exclude password field

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      user
    });
  } catch (error) {
    console.error(error); // Keep this for error logging
    res.status(500).json({
      success: false,
      error: "Error while fetching user profile",
    });
  }
};



// Update a user's profile
const updateUserProfile = async (req, res) => {
  try {
    const { username, bio } = req.body;
    let profilePicture;

    // Check if a new profile picture is provided
    if (req.file) {
      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      profilePicture = result.secure_url; // Get the secure URL of the uploaded image
      console.log('Uploaded image URL:', profilePicture); // Log the uploaded image URL
    }

    // Update user information
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      {
        username,
        bio,
        ...(profilePicture && { profilePicture }), // Only update profilePicture if it exists
      },
      { new: true, runValidators: true } // Return the updated user and run validators
    ).select('-password'); // Exclude password field

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Error while updating user profile",
    });
  }
};



// Delete a user (admin only)
const deleteUser = async (req, res) => {
  res.send("Delete user");

};




// Get all posts by a specific user
const getUserPosts = async (req, res) => {
  res.send("Get user posts");

};



// Get a user's followers
const getFollowers = async (req, res) => {
  res.send("Get user followers");

};





// Get a user's following list
const getFollowing = async (req, res) => {
  res.send("Get user following");

};




// Follow a user
const followUser = async (req, res) => {
  res.send("Follow user");

};





// Unfollow a user
const unfollowUser = async (req, res) => {
  res.send("Unfollow user");

};

module.exports = {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUserPosts,
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
};
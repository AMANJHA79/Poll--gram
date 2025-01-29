const User = require("../models/User");
const Post = require("../models/Post");



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
  res.send("Get user profile");

};



// Update a user's profile
const updateUserProfile = async (req, res) => {
  res.send("Update user profile");

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
const express = require("express");
const {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUserPosts,
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Get all users (admin only)
router.get("/", authMiddleware, adminMiddleware, getAllUsers);

// Get a specific user's profile
router.get("/:userId", authMiddleware, getUserProfile);

// Update a user's profile
router.put("/:userId", authMiddleware, updateUserProfile);

// Delete a user (admin only)
router.delete("/:userId", authMiddleware, adminMiddleware, deleteUser);

// Get all posts by a specific user
router.get("/:userId/posts", authMiddleware, getUserPosts);

// Get a user's followers
router.get("/:userId/followers", authMiddleware, getFollowers);

// Get a user's following list
router.get("/:userId/following", authMiddleware, getFollowing);

// Follow a user
router.post("/:userId/follow", authMiddleware, followUser);

// Unfollow a user
router.post("/:userId/unfollow", authMiddleware, unfollowUser);

module.exports = router;
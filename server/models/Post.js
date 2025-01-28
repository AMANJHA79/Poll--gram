const mongoose = require("mongoose");

// Define the Post schema
const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500, // Limit caption length
    },
    imageUrl: {
      type: String,
      required: true, // URL of the image stored in Cloudinary
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Users who liked the post
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment", // Reference to the Comment model
      },
    ],
    poll: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll", // Reference to the Poll model (if the post has a poll)
    }
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Export the Post model
module.exports = mongoose.model("Post", postSchema);
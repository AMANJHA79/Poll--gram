const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const storyRoutes = require("./routes/storyRoutes");
const commentRoutes = require("./routes/commentRoutes");
const likeRoutes = require("./routes/likeRoutes");
const pollRoutes = require("./routes/pollRoutes");
const messageRoutes = require("./routes/messageRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes

app.use("/api/v1/auth", authRoutes); // Authentication routes
app.use("/api/v1/users", userRoutes); // User profile routes
app.use("/api/v1/posts", postRoutes); // Post routes
app.use("/api/v1/stories", storyRoutes); // Story routes
app.use("/api/v1/comments", commentRoutes); // Comment routes
app.use("/api/v1/likes", likeRoutes); // Like routes
app.use("/api/v1/polls", pollRoutes); // Poll routes
app.use("/api/v1/messages", messageRoutes); // Direct messaging routes
app.use("/api/v1/notifications", notificationRoutes); // Notification routes
app.use("/api/v1/payments", paymentRoutes); // Payment routes

// Error handler
app.use(errorHandler);

module.exports = app;
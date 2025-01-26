const express = require('express');
require('dotenv').config();
const connectToDB = require('./config/db');
// const corsMiddleware = require('./middleware/corsConfig'); 
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
// const postRoutes = require("./routes/postRoutes");
// const storyRoutes = require("./routes/storyRoutes");
// const commentRoutes = require("./routes/commentRoutes");
// const likeRoutes = require("./routes/likeRoutes");
// const pollRoutes = require("./routes/pollRoutes");
// const messageRoutes = require("./routes/messageRoutes");
// const notificationRoutes = require("./routes/notificationRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const errorHandler = require("./middleware/errorHandler");
const useragent = require('express-useragent');

const app = express();

// Middleware
app.use(express.json());
// app.use(corsMiddleware()); // Use CORS middleware
app.use(cookieParser());
app.use(useragent.express());

// Routes

app.use("/api/v1/auth", authRoutes); // Authentication routes
// app.use("/api/v1/users", userRoutes); // User profile routes




// app.use("/api/v1/posts", postRoutes); // Post routes
// app.use("/api/v1/stories", storyRoutes); // Story routes
// app.use("/api/v1/comments", commentRoutes); // Comment routes
// app.use("/api/v1/likes", likeRoutes); // Like routes
// app.use("/api/v1/polls", pollRoutes); // Poll routes
// app.use("/api/v1/messages", messageRoutes); // Direct messaging routes
// app.use("/api/v1/notifications", notificationRoutes); // Notification routes
// app.use("/api/v1/payments", paymentRoutes); // Payment routes

// Error handler
// app.use(errorHandler);
app.use(express.json());



const port = process.env.PORT || 3000;







app.listen(port, async () => {
    await connectToDB();
  console.log(`Server is running on port ${port}`);
});
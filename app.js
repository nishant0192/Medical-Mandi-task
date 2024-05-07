const express = require("express");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes"); // Add this line to import postRoutes
const commentRoutes = require("./routes/commentRoutes");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const dotenv = require("dotenv");

// Middleware
app.use(express.json());
dotenv.config();

// Routes
app.use("/api/users", authRoutes);
app.use("/api/posts", postRoutes); // Mount postRoutes under /api/posts
app.use("/api/posts", commentRoutes);
app.use(errorHandler);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

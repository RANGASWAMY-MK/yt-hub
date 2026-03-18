const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const path = require("path");

const videoRoutes = require("./routes/videoRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
});
app.use(limiter);

// Routes
app.use("/api", videoRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// Health check
app.get("/health", (req, res) => {
  res.send("Server is running");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

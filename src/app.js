require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");

const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, "..", "public")));

// Connect DB
connectDB();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// Test route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "login.html"));
});


const taskRoutes = require("./routes/task.routes");
app.use("/api/tasks", taskRoutes);

const adminRoutes = require("./routes/admin.routes");
app.use("/api/admin", adminRoutes);



// Start server
const PORT = process.env.PORT || 4000;

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

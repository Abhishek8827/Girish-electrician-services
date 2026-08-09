const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");
const multer = require("multer");
const serviceRequestRoutes = require("./routes/serviceRequestRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({ origin: clientUrl, methods: ["GET", "POST"] }));
app.use(express.json({ limit: "1mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Girish Electrician Services API is running." });
});

app.use("/api/service-requests", serviceRequestRoutes);

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    const message = error.code === "LIMIT_FILE_SIZE"
      ? "Image must be 5 MB or smaller."
      : "Upload a JPG, PNG, or WebP image.";
    return res.status(400).json({ success: false, message });
  }

  console.error(error);
  return res.status(500).json({ success: false, message: "Unable to submit your request. Please try again." });
});

async function startServer() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing. Copy .env.example to .env and add your connection string.");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
}

startServer().catch((error) => {
  console.error(`Unable to start API: ${error.message}`);
  process.exit(1);
});

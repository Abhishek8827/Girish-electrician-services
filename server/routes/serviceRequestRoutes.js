const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const express = require("express");
const multer = require("multer");
const Counter = require("../models/Counter");
const ServiceRequest = require("../models/ServiceRequest");

const router = express.Router();
const uploadsDirectory = path.join(__dirname, "..", "uploads");
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

fs.mkdirSync(uploadsDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, uploadsDirectory),
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `${crypto.randomUUID()}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (allowedImageTypes.has(file.mimetype)) {
      callback(null, true);
      return;
    }

    callback(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "image"));
  },
});

function cleanText(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function removeUploadedFile(file) {
  if (file?.path) fs.unlink(file.path, () => {});
}

function getLocalDate() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

function getValidationErrors(data) {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9+()\-\s]{7,30}$/;
  const today = getLocalDate();

  if (data.name.length < 2) errors.name = "Enter your full name.";
  if (!phonePattern.test(data.phone)) errors.phone = "Enter a valid phone number.";
  if (!emailPattern.test(data.email)) errors.email = "Enter a valid email address.";
  if (!data.serviceType) errors.serviceType = "Choose a service type.";
  if (!data.propertyType) errors.propertyType = "Choose a property type.";
  if (data.address.length < 5) errors.address = "Enter the service address.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.preferredDate) || data.preferredDate < today) {
    errors.preferredDate = "Choose today or a future date.";
  }
  if (!/^\d{2}:\d{2}$/.test(data.preferredTime)) errors.preferredTime = "Choose a preferred time.";
  if (data.description.length < 10) errors.description = "Describe the issue in at least 10 characters.";

  return errors;
}

async function nextRequestId() {
  const year = new Date().getFullYear();
  const counter = await Counter.findOneAndUpdate(
    { name: `service-request-${year}` },
    { $inc: { sequence: 1 } },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );

  return `ELC-${year}-${String(counter.sequence).padStart(4, "0")}`;
}

router.post("/", upload.single("image"), async (req, res, next) => {
  const data = {
    name: cleanText(req.body.name),
    phone: cleanText(req.body.phone),
    email: cleanText(req.body.email).toLowerCase(),
    serviceType: cleanText(req.body.serviceType),
    propertyType: cleanText(req.body.propertyType),
    address: cleanText(req.body.address),
    preferredDate: cleanText(req.body.preferredDate),
    preferredTime: cleanText(req.body.preferredTime),
    description: cleanText(req.body.description),
    emergency: req.body.emergency === "true" || req.body.emergency === true,
  };
  const errors = getValidationErrors(data);

  if (Object.keys(errors).length > 0) {
    removeUploadedFile(req.file);
    return res.status(422).json({ success: false, message: "Please correct the highlighted fields.", errors });
  }

  try {
    const requestId = await nextRequestId();
    const request = await ServiceRequest.create({
      ...data,
      requestId,
      image: req.file
        ? {
            url: `/uploads/${req.file.filename}`,
            originalName: cleanText(req.file.originalname),
            mimeType: req.file.mimetype,
            size: req.file.size,
          }
        : undefined,
    });

    return res.status(201).json({
      success: true,
      requestId: request.requestId,
      message: "Service request received successfully.",
    });
  } catch (error) {
    removeUploadedFile(req.file);
    return next(error);
  }
});

module.exports = router;

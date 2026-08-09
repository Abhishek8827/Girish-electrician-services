const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ServiceRequest = require("../models/ServiceRequest");
const requireAdmin = require("../middleware/requireAdmin");

const router = express.Router();
const allowedStatuses = ["Pending", "Contacted", "Scheduled", "Completed", "Cancelled"];

router.post("/login", async (req, res, next) => {
  try {
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD_HASH || !process.env.JWT_SECRET) {
      return res.status(503).json({ success: false, message: "Admin access has not been configured yet." });
    }

    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const emailMatches = email === process.env.ADMIN_EMAIL.trim().toLowerCase();
    const passwordMatches = emailMatches && await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);

    if (!passwordMatches) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const token = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET, { expiresIn: "8h" });
    return res.json({ success: true, token, expiresIn: "8h" });
  } catch (error) {
    return next(error);
  }
});

router.get("/service-requests", requireAdmin, async (req, res, next) => {
  try {
    const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 20, 1), 100);
    const status = String(req.query.status || "").trim();
    const filter = allowedStatuses.includes(status) ? { status } : {};
    const [requests, total] = await Promise.all([
      ServiceRequest.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      ServiceRequest.countDocuments(filter),
    ]);

    return res.json({ success: true, requests, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) {
    return next(error);
  }
});

router.patch("/service-requests/:id/status", requireAdmin, async (req, res, next) => {
  try {
    const status = String(req.body.status || "").trim();
    if (!allowedStatuses.includes(status)) {
      return res.status(422).json({ success: false, message: "Choose a valid request status." });
    }
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ success: false, message: "Request not found." });
    }

    const request = await ServiceRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ success: false, message: "Request not found." });

    if (request.status !== status) {
      request.status = status;
      request.statusHistory.push({ status, changedAt: new Date() });
      await request.save();
    }

    return res.json({ success: true, request });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

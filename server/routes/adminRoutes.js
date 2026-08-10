const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ServiceRequest = require("../models/ServiceRequest");
const Electrician = require("../models/Electrician");
const requireAdmin = require("../middleware/requireAdmin");

const router = express.Router();
const allowedStatuses = [
  "Pending",
  "Contacted",
  "Scheduled",
  "Completed",
  "Cancelled",
];

router.post("/login", async (req, res, next) => {
  try {
    if (
      !process.env.ADMIN_EMAIL ||
      !process.env.ADMIN_PASSWORD_HASH ||
      !process.env.JWT_SECRET
    ) {
      return res.status(503).json({
        success: false,
        message: "Admin access has not been configured yet.",
      });
    }

    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();
    const password = String(req.body.password || "");
    const emailMatches = email === process.env.ADMIN_EMAIL.trim().toLowerCase();
    const passwordMatches =
      emailMatches &&
      (await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH));

    if (!passwordMatches) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    const token = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });
    return res.json({ success: true, token, expiresIn: "8h" });
  } catch (error) {
    return next(error);
  }
});

router.get("/service-requests", requireAdmin, async (req, res, next) => {
  try {
    const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(
      Math.max(Number.parseInt(req.query.limit, 10) || 20, 1),
      100,
    );
    const status = String(req.query.status || "").trim();
    const sortBy = String(req.query.sortBy || "createdAt_desc").trim();
    const searchId = String(req.query.searchId || "")
      .trim()
      .toUpperCase();
    const emergency = req.query.emergency === "true";

    const filter = {};
    if (searchId) {
      filter.requestId = searchId;
    } else {
      if (allowedStatuses.includes(status)) {
        filter.status = status;
      }
      if (emergency) {
        filter.emergency = true;
      }
    }

    const sortOptions = {
      createdAt_desc: { createdAt: -1 },
      createdAt_asc: { createdAt: 1 },
      preferredDate_asc: { preferredDate: 1, preferredTime: 1 },
      preferredDate_desc: { preferredDate: -1, preferredTime: -1 },
    };
    const sort = sortOptions[sortBy] || sortOptions.createdAt_desc;

    const [requests, total] = await Promise.all([
      ServiceRequest.find(filter)
        .sort(sort)
        .populate("assignedElectrician", "name phone")
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      ServiceRequest.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      requests,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return next(error);
  }
});

router.patch(
  "/service-requests/:id/status",
  requireAdmin,
  async (req, res, next) => {
    try {
      const status = String(req.body.status || "").trim();
      const { assignedElectrician } = req.body;

      if (!allowedStatuses.includes(status)) {
        return res
          .status(422)
          .json({ success: false, message: "Choose a valid request status." });
      }
      if (
        assignedElectrician &&
        !mongoose.isValidObjectId(assignedElectrician)
      ) {
        return res
          .status(422)
          .json({ success: false, message: "Invalid electrician ID." });
      }

      if (!mongoose.isValidObjectId(req.params.id)) {
        return res
          .status(404)
          .json({ success: false, message: "Request not found." });
      }

      const request = await ServiceRequest.findById(req.params.id);
      if (!request)
        return res
          .status(404)
          .json({ success: false, message: "Request not found." });

      const statusChanged = request.status !== status;
      const assignmentChanged =
        String(request.assignedElectrician) !== String(assignedElectrician);

      if (statusChanged) {
        request.status = status;
        request.statusHistory.push({ status, changedAt: new Date() });
      }

      if (assignmentChanged) {
        request.assignedElectrician =
          assignedElectrician === "unassigned" ? null : assignedElectrician;
      }

      if (statusChanged || assignmentChanged) {
        await request.save();
      }

      return res.json({ success: true, request });
    } catch (error) {
      return next(error);
    }
  },
);

router.get("/electricians", requireAdmin, async (req, res, next) => {
  try {
    const electricians = await Electrician.find().sort({ name: 1 }).lean();
    return res.json({ success: true, electricians });
  } catch (error) {
    return next(error);
  }
});

router.post("/electricians", requireAdmin, async (req, res, next) => {
  try {
    const { name, phone } = req.body;
    if (!name || !phone) {
      return res
        .status(422)
        .json({ success: false, message: "Name and phone are required." });
    }
    const electrician = await Electrician.create({
      name: String(name).trim(),
      phone: String(phone).trim(),
    });
    return res.status(201).json({ success: true, electrician });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An electrician with that phone number already exists.",
      });
    }
    return next(error);
  }
});

router.delete("/electricians/:id", requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Electrician not found." });
    }

    const result = await Electrician.findByIdAndDelete(id);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Electrician not found." });
    }

    // Optional: Unassign this electrician from any requests they were assigned to.
    await ServiceRequest.updateMany(
      { assignedElectrician: id },
      { $set: { assignedElectrician: null } },
    );

    return res.json({
      success: true,
      message: "Electrician deleted successfully.",
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
  {
    requestId: { type: String, required: true, unique: true, index: true },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    serviceType: { type: String, required: true, trim: true, maxlength: 100 },
    propertyType: { type: String, required: true, trim: true, maxlength: 100 },
    address: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 500,
    },
    preferredDate: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },
    preferredTime: { type: String, required: true, match: /^\d{2}:\d{2}$/ },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 2000,
    },
    emergency: { type: Boolean, default: false },
    image: {
      url: { type: String, default: null },
      originalName: { type: String, default: null },
      mimeType: { type: String, default: null },
      size: { type: Number, default: null },
    },
    status: {
      type: String,
      enum: ["Pending", "Contacted", "Scheduled", "Completed", "Cancelled"],
      default: "Pending",
    },
    statusHistory: [
      {
        status: {
          type: String,
          enum: ["Pending", "Contacted", "Scheduled", "Completed", "Cancelled"],
          required: true,
        },
        changedAt: { type: Date, required: true, default: Date.now },
      },
    ],
    assignedElectrician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Electrician",
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);

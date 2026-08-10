const mongoose = require("mongoose");

const electricianSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Electrician", electricianSchema);

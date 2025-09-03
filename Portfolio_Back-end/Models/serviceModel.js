const mongoose = require("mongoose");
const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    tagline: { type: String, required: true },
    bullets: { type: [String], default: [] },
    icon: { type: String, required: true },
    cta: { type: String },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);

const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  name: { type: String, required: true },

  payload: { type: Object, default: {} },

  runAt: { type: Date, required: true },

  status: {
    type: String,
    enum: ["PENDING", "RUNNING", "COMPLETED", "FAILED", "CANCELLED"],
    default: "PENDING"
  },

  recurrence: {
    type: {
      type: String,
      enum: ["NONE", "MINUTELY", "HOURLY", "DAILY", "WEEKLY", "MONTHLY"],
      default: "NONE"
    },
    interval: { type: Number, default: 1 }
  },

  attempts: { type: Number, default: 0 },
  maxRetries: { type: Number, default: 3 },
  lastError: { type: String },

  lockedAt: Date, // prevents double execution

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);

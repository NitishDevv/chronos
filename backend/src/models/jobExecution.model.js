const mongoose = require("mongoose");

const jobExecutionSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },

  status: {
    type: String,
    enum: ["RUNNING", "COMPLETED", "FAILED"]
  },

  startedAt: Date,
  finishedAt: Date,

  error: String
}, { timestamps: true });

module.exports = mongoose.model("JobExecution", jobExecutionSchema);

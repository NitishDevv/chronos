const express = require("express");
const router = express.Router();
const Job = require("../models/job.model");

router.get("/", async (req, res) => {
  const stats = {
    status: "OK",
    timestamp: new Date(),
    jobs: {
      pending: await Job.countDocuments({ status: "PENDING" }),
      running: await Job.countDocuments({ status: "RUNNING" }),
      completed: await Job.countDocuments({ status: "COMPLETED" }),
      failed: await Job.countDocuments({ status: "FAILED" })
    }
  };

  res.json(stats);
});

module.exports = router;

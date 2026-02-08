const express = require("express");
const { createJob, getJobs, cancelJob, rescheduleJob, retryJob } = require("../controllers/job.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, createJob);
router.get("/", authMiddleware, getJobs);
router.patch("/:id/cancel", authMiddleware, cancelJob);
router.patch("/:id/reschedule", authMiddleware, rescheduleJob);
router.patch("/:id/retry", authMiddleware, retryJob);

module.exports = router;

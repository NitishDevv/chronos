const express = require("express");
const router = express.Router();

const { getJobExecutions } = require("../controllers/execution.controller");
const auth = require("../middleware/auth.middleware");

router.get("/job/:jobId", auth, getJobExecutions);

module.exports = router;

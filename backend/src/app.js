const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const jobRoutes = require("./routes/job.routes");
const healthRoutes = require("./routes/health.routes");
const executionRoutes = require("./routes/execution.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/executions", executionRoutes);


module.exports = app;

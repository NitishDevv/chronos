const JobExecution = require("../models/jobExecution.model");

exports.getJobExecutions = async (req, res) => {
  const executions = await JobExecution.find({
    jobId: req.params.jobId
  }).sort({ startedAt: -1 });

  res.json(executions);
};

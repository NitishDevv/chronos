const Job = require("../models/job.model");

/* CREATE JOB */
exports.createJob = async (req, res) => {
  const { name, payload, runAt, recurrence, maxRetries } = req.body;

  const job = await Job.create({
    name,
    payload,
    runAt,
    recurrence: recurrence || { type: "NONE" },
    maxRetries: maxRetries ?? 3,
    createdBy: req.user.id
  });

  res.status(201).json(job);
};

/* GET JOBS */
exports.getJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.id })
    .sort({ createdAt: -1 });

  res.json(jobs);
};

/* CANCEL JOB */
exports.cancelJob = async (req, res) => {
  const job = await Job.findOne({
    _id: req.params.id,
    createdBy: req.user.id
  });

  if (!job) return res.sendStatus(404);

  if (job.status !== "PENDING") {
    return res.status(400).json({ message: "Cannot cancel job" });
  }

  job.status = "CANCELLED";
  await job.save();

  res.json(job);
};

/* RESCHEDULE JOB */
exports.rescheduleJob = async (req, res) => {
  const job = await Job.findOne({
    _id: req.params.id,
    createdBy: req.user.id
  });

  if (!job) return res.sendStatus(404);

  job.runAt = new Date(req.body.runAt);
  job.status = "PENDING";
  job.attempts = 0;
  job.lockedAt = null;

  await job.save();
  res.json(job);
};

exports.retryJob = async (req, res) => {
  const job = await Job.findOne({
    _id: req.params.id,
    createdBy: req.user.id
  });

  if (!job) return res.sendStatus(404);
  if (job.status !== "FAILED") {
    return res.status(400).json({ message: "Only failed jobs can be retried" });
  }

  job.status = "PENDING";
  job.attempts = 0;
  job.lockedAt = null;
  await job.save();

  res.json(job);
};


const Job = require("../models/job.model");
const JobExecution = require("../models/jobExecution.model");

const getNextRun = (job) => {
  const next = new Date(job.runAt);

  switch (job.recurrence.type) {
    case "MINUTELY": next.setMinutes(next.getMinutes() + job.recurrence.interval);break;
    case "HOURLY": next.setHours(next.getHours() + job.recurrence.interval); break;
    case "DAILY": next.setDate(next.getDate() + job.recurrence.interval); break;
    case "WEEKLY": next.setDate(next.getDate() + 7 * job.recurrence.interval); break;
    case "MONTHLY": next.setMonth(next.getMonth() + job.recurrence.interval); break;
  }

  return next;
};

const startScheduler = () => {
  setInterval(async () => {
    const now = new Date();

    const jobs = await Job.find({
      status: "PENDING",
      runAt: { $lte: now },
      $or: [{ lockedAt: null }, { lockedAt: { $exists: false } }]
    });

    for (const job of jobs) {
      job.lockedAt = new Date();
      job.status = "RUNNING";
      await job.save();

      const log = await JobExecution.create({
        jobId: job._id,
        status: "RUNNING",
        startedAt: new Date()
      });

      try {
        console.log("Executing job:", job.name, job.payload);

        job.status = "COMPLETED";
        await job.save();

        log.status = "COMPLETED";
        log.finishedAt = new Date();
        await log.save();

        // 🔁 recurrence
        if (job.recurrence.type !== "NONE") {
          await Job.create({
            ...job.toObject(),
            _id: undefined,
            status: "PENDING",
            lockedAt: null,
            attempts: 0,
            runAt: getNextRun(job)
          });
        }

      } catch (err) {
        job.attempts += 1;
        job.lastError = err.message;
        job.lockedAt = null;

        if (job.attempts >= job.maxRetries) {
          job.status = "FAILED";
        } else {
          job.status = "PENDING";
        }

        await job.save();

        log.status = "FAILED";
        log.error = err.message;
        log.finishedAt = new Date();
        await log.save();
      }
    }
  }, 3000);
};

module.exports = startScheduler;

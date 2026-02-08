require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const startScheduler = require("./scheduler/scheduler");

connectDB();
startScheduler();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

const express = require("express");
const apiRoutes = express.Router();
const fs = require("fs");

const dataPath = "./Database/data.json";

// Store original data from data.json in memory cache
let cachedData = { jobs: [] };

const readDataFromFile = () => {
  try {
    const jsonData = fs.readFileSync(dataPath);
    cachedData = JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading data from file:", error);
  }
};

readDataFromFile(); // Initial read on server start

// Middleware to update cache before each API request
apiRoutes.use((req, res, next) => {
  readDataFromFile();
  next();
});

// To get the data
apiRoutes.get("/jobs", (req, res) => {
  const jobs = cachedData.jobs;
  const limit = req.query._limit;

  if (limit && !isNaN(limit)) {
    const limitedJobs = jobs.slice(0, parseInt(limit));
    res.send(limitedJobs);
  } else {
    res.send(jobs);
  }
});

// To upload the data
apiRoutes.post("/jobs", (req, res) => {
  const newJob = req.body;
  const newJobId = Math.floor(100000 + Math.random() * 900000).toString();
  newJob.id = newJobId;

  // Temporarily add new job to cachedData
  cachedData.jobs.push(newJob);
  res.send({ success: true, msg: "Job Created Successfully!", job: newJob });
});

// To update the data
apiRoutes.put("/jobs/:id", (req, res) => {
  const jobId = req.params.id;
  const index = cachedData.jobs.findIndex((job) => job.id === jobId);
  if (index !== -1) {
    const updatedJob = { ...req.body, id: jobId };
    cachedData.jobs[index] = updatedJob;
    res.send({
      success: true,
      msg: `Job with id ${jobId} has been updated`,
      job: updatedJob,
    });
  } else {
    res.status(404).send({ success: true, msg: "Job not found!" });
  }
});

// To delete the data
apiRoutes.delete("/jobs/:id", (req, res) => {
  const jobId = req.params.id;
  const index = cachedData.jobs.findIndex((job) => job.id === jobId);
  if (index !== -1) {
    const deletedJob = cachedData.jobs.splice(index, 1)[0];
    res.send({
      success: true,
      msg: `Job with id ${jobId} has been deleted`,
      job: deletedJob,
    });
  } else {
    res.status(404).send({ success: false, msg: "Job not found!" });
  }
});

module.exports = apiRoutes;

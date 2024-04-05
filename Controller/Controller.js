const express = require("express");
const apiRoutes = express.Router();

// Import JSON data from Data.js initially
let jsonData = require("./Data");

// Function to update jsonData with fresh data from Data.js
const updateData = () => {
  try {
    delete require.cache[require.resolve("./Data")]; // Clear cache to force re-import
    jsonData = require("./Data");
    console.log("Data updated at: ", new Date());
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

// Call updateData initially and then every 4 minutes
updateData(); // Initial update
const interval = setInterval(updateData, 3 * 60 * 1000);

// To get the data
apiRoutes.get("/", (req, res) => {
  const jobs = jsonData.jobs;
  const limit = req.query._limit;

  if (limit && !isNaN(limit)) {
    const limitedJobs = jobs.slice(0, parseInt(limit));
    res.send(limitedJobs);
  } else {
    res.send(jobs);
  }
});

// To get the data for a specific job by ID
apiRoutes.get("/:id", (req, res) => {
  const jobId = req.params.id;
  const job = jsonData.jobs.find((job) => job.id === jobId);
  if (job) {
    res.send(job);
  } else {
    res
      .status(404)
      .send({ success: false, msg: "No job found with the provided ID." });
  }
});

// To create or post the data
apiRoutes.post("/", (req, res) => {
  const newJob = req.body;
  const newJobId = Math.floor(100000 + Math.random() * 900000).toString();
  newJob.id = newJobId;

  // Temporarily add new job to jsonData
  jsonData.jobs.push(newJob);
  res.send({ success: true, msg: "Job Created Successfully!", job: newJob });
});

// To update the data
apiRoutes.put("/:id", (req, res) => {
  const jobId = req.params.id;
  const index = jsonData.jobs.findIndex((job) => job.id === jobId);
  if (index !== -1) {
    const updatedJob = { ...req.body, id: jobId };
    jsonData.jobs[index] = updatedJob;
    res.send({
      success: true,
      msg: `Job with id ${jobId} has been updated`,
      job: updatedJob,
    });
  } else {
    res.status(404).send({ success: false, msg: "Job not found!" });
  }
});

// To delete the data
apiRoutes.delete("/:id", (req, res) => {
  const jobId = req.params.id;
  const index = jsonData.jobs.findIndex((job) => job.id === jobId);
  if (index !== -1) {
    const deletedJob = jsonData.jobs.splice(index, 1)[0];
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

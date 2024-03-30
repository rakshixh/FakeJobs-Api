const express = require("express");
const apiRoutes = express.Router();

// Import JSON data from Data.js
const jsonData = require("./Data");

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

// To upload the data
apiRoutes.post("/", (req, res) => {
  const newJob = req.body;
  const newJobId = Math.floor(100000 + Math.random() * 900000).toString();
  newJob.id = newJobId;

  // Create a shallow copy of jsonData before modifying it
  const updatedData = { ...jsonData };
  updatedData.jobs.push(newJob);

  // Update the reference to the jsonData object
  Object.assign(jsonData, updatedData);

  res.send({ success: true, msg: "Job Created Successfully!", job: newJob });
});

// To update the data
apiRoutes.put("/:id", (req, res) => {
  const jobId = req.params.id;
  const index = jsonData.jobs.findIndex((job) => job.id === jobId);
  if (index !== -1) {
    const updatedJob = { ...req.body, id: jobId };

    // Create a shallow copy of jsonData before modifying it
    const updatedData = { ...jsonData };
    updatedData.jobs[index] = updatedJob;

    // Update the reference to the jsonData object
    Object.assign(jsonData, updatedData);

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
apiRoutes.delete("/:id", (req, res) => {
  const jobId = req.params.id;
  const index = jsonData.jobs.findIndex((job) => job.id === jobId);
  if (index !== -1) {
    // Create a shallow copy of jsonData before modifying it
    const updatedData = { ...jsonData };
    const deletedJob = updatedData.jobs.splice(index, 1)[0];

    // Update the reference to the jsonData object
    Object.assign(jsonData, updatedData);

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

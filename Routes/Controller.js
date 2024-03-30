const express = require("express");
const apiRoutes = express.Router();
const fs = require("fs");
const { get } = require("http");

const dataPath = "./Database/data.json";

//Write function
const saveData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(dataPath, stringifyData);
};

//Read function
const getData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

// reading the data
apiRoutes.get("/read/jobs", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    res.send(JSON.parse(data));
  });
});

// To get the data also with query param ?_limit
apiRoutes.get("/jobs", (req, res) => {
  const jobs = getData();
  const jobs_limit = getData().jobs;
  const limit = req.query._limit;

  if (limit && !isNaN(limit)) {
    const limitedJobs = jobs_limit.slice(0, parseInt(limit));
    res.send(limitedJobs);
  } else {
    res.send(jobs);
  }
});

//To upload the data
apiRoutes.post("/jobs", (req, res) => {
  const newJob = req.body;
  const existingData = getData();
  const existingJobs = existingData.jobs;

  const newJobId = Math.floor(100000 + Math.random() * 900000);
  newJob.id = newJobId.toString();

  existingJobs.push(newJob);
  existingData.jobs = existingJobs;
  saveData(existingData);
  res.send({ success: true, msg: "Job Created Successfully!" });
});

// To update the data
apiRoutes.put("/jobs/:id", (req, res) => {
  const jobId = req.params.id;
  const existingData = getData();
  const existingJobs = existingData.jobs;

  const index = existingJobs.findIndex((job) => job.id === jobId);
  if (index !== -1) {
    const updatedJob = { ...req.body, id: jobId };
    existingJobs[index] = updatedJob;

    existingData.jobs = existingJobs;
    saveData(existingData);
    res.send(`Job with id ${jobId} has been updated`);
  } else {
    res.status(404).send("Job not found");
  }
});

//To delete the data
apiRoutes.delete("/jobs/:id", (req, res) => {
  const jobId = req.params.id;
  const existingData = getData();
  const existingJobs = existingData.jobs;

  const index = existingJobs.findIndex((job) => job.id === jobId);
  if (index !== -1) {
    existingJobs.splice(index, 1);

    existingData.jobs = existingJobs;
    saveData(existingData);
    res.send(`Job with id ${jobId} has been deleted`);
  } else {
    res.status(404).send("Job not found");
  }
});

module.exports = apiRoutes;

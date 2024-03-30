// api/jobs/index.js

const fs = require("fs");
const path = require("path");

// Store original data from data.json in memory cache
let cachedData = { jobs: [] };

const dataPath = path.join(__dirname, "../../Database/data.json");

const readDataFromFile = () => {
  try {
    const jsonData = fs.readFileSync(dataPath);
    cachedData = JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading data from file:", error);
  }
};

readDataFromFile(); // Initial read on server start

module.exports = async (req, res) => {
  const { method } = req;

  // Middleware to update cache before each API request
  readDataFromFile();

  switch (method) {
    case "GET":
      handleGetRequest(req, res);
      break;
    case "POST":
      handlePostRequest(req, res);
      break;
    case "PUT":
      handlePutRequest(req, res);
      break;
    case "DELETE":
      handleDeleteRequest(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

const handleGetRequest = (req, res) => {
  const jobs = cachedData.jobs;
  const limit = req.query._limit;

  if (limit && !isNaN(limit)) {
    const limitedJobs = jobs.slice(0, parseInt(limit));
    res.json(limitedJobs);
  } else {
    res.json(jobs);
  }
};

const handlePostRequest = (req, res) => {
  const newJob = req.body;
  const newJobId = Math.floor(100000 + Math.random() * 900000).toString();
  newJob.id = newJobId;

  // Temporarily add new job to cachedData
  cachedData.jobs.push(newJob);
  res
    .status(201)
    .json({ success: true, msg: "Job Created Successfully!", job: newJob });
};

const handlePutRequest = (req, res) => {
  const jobId = req.query.id;
  const index = cachedData.jobs.findIndex((job) => job.id === jobId);
  if (index !== -1) {
    const updatedJob = { ...req.body, id: jobId };
    cachedData.jobs[index] = updatedJob;
    res.json({
      success: true,
      msg: `Job with id ${jobId} has been updated`,
      job: updatedJob,
    });
  } else {
    res.status(404).json({ success: false, msg: "Job not found!" });
  }
};

const handleDeleteRequest = (req, res) => {
  const jobId = req.query.id;
  const index = cachedData.jobs.findIndex((job) => job.id === jobId);
  if (index !== -1) {
    const deletedJob = cachedData.jobs.splice(index, 1)[0];
    res.json({
      success: true,
      msg: `Job with id ${jobId} has been deleted`,
      job: deletedJob,
    });
  } else {
    res.status(404).json({ success: false, msg: "Job not found!" });
  }
};

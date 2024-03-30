import fs from "fs";
import path from "path";
import { VercelRequest, VercelResponse } from "@vercel/node";

// Define a type for the job object
interface Job {
  id: string;
  title: string;
  type: string;
  location: string;
  description: string;
  salary: string;
  company: {
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
  };
}

// Initialize cachedData with an empty array
let cachedData: { jobs: Job[] } = { jobs: [] };

const dataPath = path.join(process.cwd(), "Database", "data.json");

const readDataFromFile = () => {
  try {
    const jsonData = fs.readFileSync(dataPath, "utf8");
    cachedData = JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading data from file:", error);
  }
};

readDataFromFile(); // Initial read on server start

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req;

  // Middleware to update cache before each API request
  readDataFromFile();

  // Define handleGetRequest function
  const handleGetRequest = () => {
    const jobs = cachedData.jobs;
    const limit = req.query._limit;

    // Check if limit is a string or an array of strings
    if (typeof limit === "string") {
      // Convert the string to a number
      const limitNumber = parseInt(limit);
      if (!isNaN(limitNumber)) {
        const limitedJobs = jobs.slice(0, limitNumber);
        res.json(limitedJobs);
        return;
      }
    } else if (Array.isArray(limit)) {
      // Handle the case where limit is an array of strings
      const limitNumbers = limit.map((str) => parseInt(str));
      const validNumbers = limitNumbers.filter((num) => !isNaN(num));
      if (validNumbers.length > 0) {
        const maxLimit = Math.max(...validNumbers);
        const limitedJobs = jobs.slice(0, maxLimit);
        res.json(limitedJobs);
        return;
      }
    }

    // If limit is not a valid number or array of valid numbers, return all jobs
    res.json(jobs);
  };

  // Define handlePostRequest function
  const handlePostRequest = () => {
    const newJob: Job = req.body as Job;
    const newJobId = Math.floor(100000 + Math.random() * 900000).toString();
    newJob.id = newJobId;

    // Push the new job to the cachedData array
    cachedData.jobs.push(newJob);

    res
      .status(201)
      .json({ success: true, msg: "Job Created Successfully!", job: newJob });
  };

  // Define handlePutRequest function
  const handlePutRequest = () => {
    const jobId = req.query.id as string;
    const index = cachedData.jobs.findIndex((job: any) => job.id === jobId);
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

  // Define handleDeleteRequest function
  const handleDeleteRequest = () => {
    const jobId = req.query.id as string;
    const index = cachedData.jobs.findIndex((job: any) => job.id === jobId);
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

  switch (method) {
    case "GET":
      handleGetRequest();
      break;
    case "POST":
      handlePostRequest();
      break;
    case "PUT":
      handlePutRequest();
      break;
    case "DELETE":
      handleDeleteRequest();
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

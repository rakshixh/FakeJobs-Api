const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const favicon = require("serve-favicon");
const path = require("path");

// create our express app
const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

// Serve favicon
app.use(favicon(path.join(__dirname, "favicon.ico")));

// route
app.get("/", (req, res) => {
  res.send("Welcome to the Fake Jobs API!");
});

const routes = require("./Routes/routes");
app.use("/jobs", routes);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

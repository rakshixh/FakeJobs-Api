const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// create our express app
const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

// route
const routes = require("./Routes/Route");
app.use("/", routes);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

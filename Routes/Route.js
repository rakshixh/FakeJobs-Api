const express = require("express");
const router = express.Router();
const fs = require("fs");
const apiRoutes = require("./Controller.js");

router.use(apiRoutes);
module.exports = router;

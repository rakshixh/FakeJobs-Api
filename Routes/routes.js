const express = require("express");
const router = express.Router();
const apiRoutes = require("../Controller/Controller");

router.use(apiRoutes);
module.exports = router;

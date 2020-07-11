// importing the express
const express = require("express");

// taking the router form the express server
const router = express.Router();

// using the v1 route
router.use("/v1", require("./v1"));

// exporting the router to be used in different module or files
module.exports = router;

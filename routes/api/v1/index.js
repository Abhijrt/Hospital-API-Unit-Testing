// importing the express
const express = require("express");

// taking the router form the express server
const router = express.Router();

// using the doctors route
router.use("/doctors", require("./doctors"));

// exporting the router to be used in different module or files
module.exports = router;

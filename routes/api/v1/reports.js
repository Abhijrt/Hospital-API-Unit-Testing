// importing the express
const express = require("express");
const passport = require("passport");

// taking the router form the express server
const router = express.Router();

// taking the reports controller for calling the  report
const reportsController = require("../../../controllers/api/v1/reports_controller");

// when a status report url call
router.get("/:status", reportsController.report);

// exporting the router to be used in different module or files
module.exports = router;

// importing the express
const express = require("express");

// taking the router form the express server
const router = express.Router();

// taking the doctors controller for calling the doctors registration page
const reportsController = require("../../../controllers/api/v1/reports_controller");

// when register url call then create a new user
router.get("/:status", reportsController.report);

// exporting the router to be used in different module or files
module.exports = router;

// importing the express
const express = require("express");
const passport = require("passport");

// taking the router form the express server
const router = express.Router();

// taking the doctors controller for calling the doctors registration page
const reportsController = require("../../../controllers/api/v1/reports_controller");

// when register url call then create a new user
router.get(
  "/:status",
  passport.authenticate("jwt", {
    session: false,
  }),
  reportsController.report
);

// exporting the router to be used in different module or files
module.exports = router;

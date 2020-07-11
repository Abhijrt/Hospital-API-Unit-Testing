// importing the express
const express = require("express");

// taking the router form the express server
const router = express.Router();

// taking the doctors controller for calling the doctors registration page
const patientController = require("../../../controllers/api/v1/patient_controller");
const passport = require("passport");

// when register url call then create a new user
router.post(
  "/register",
  passport.authenticate("jwt", {
    session: false,
  }),
  patientController.register
);

router.get("/:id/create_report", patientController.createReport);

// exporting the router to be used in different module or files
module.exports = router;

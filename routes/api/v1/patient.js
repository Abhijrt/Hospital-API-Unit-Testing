// importing the express
const express = require("express");

// taking the router form the express server
const router = express.Router();

// taking the doctors controller for calling the doctors registration page
const patientController = require("../../../controllers/api/v1/patient_controller");
const passport = require("passport");

// when register url call for patient then create a new user
router.post(
  "/register",
  passport.authenticate("jwt", {
    session: false,
  }),
  patientController.register
);

// when the create report call for perticular patinet
router.get(
  "/:id/create_report",
  passport.authenticate("jwt", {
    session: false,
  }),
  patientController.createReport
);

// when all report url call for perticular patient
router.get("/:id/all_reports", patientController.allReport);
// exporting the router to be used in different module or files
module.exports = router;

// importing the express
const express = require("express");

// taking the router form the express server
const router = express.Router();

// taking the doctors controller for calling the doctors registration page
const doctorsController = require("../../../controllers/api/v1/doctors_controller");

// when register url call then create a new user
router.post("/register", doctorsController.register);

// when a login url call for doctor
router.post("/login", doctorsController.createSession);

// exporting the router to be used in different module or files
module.exports = router;

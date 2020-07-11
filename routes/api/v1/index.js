// importing the express
const express = require("express");

// taking the router form the express server
const router = express.Router();

// taking the home controller
const homeController = require("../../../controllers/api/v1/home_controller");

// calling the home page of API
router.get("/", homeController.home);

// using the doctors route
router.use("/doctors", require("./doctors"));

// using the patient route
router.use("/patient", require("./patient"));

// exporting the router to be used in different module or files
module.exports = router;

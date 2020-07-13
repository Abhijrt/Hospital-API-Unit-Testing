// importing the user model
const User = require("../../../models/users");

// importing the report model
const Report = require("../../../models/report");

// importing the passport
const passport = require("passport");

// importing the crypto for generating the random passwor din encrypted form
const crypto = require("crypto");

// when a patient register url call then this function register the patient
module.exports.register = async function (req, res) {
  // finding the patient if alreay register
  let patient = await User.findOne({ username: req.body.username });
  // if patient not found then register it and returning response
  if (!patient) {
    User.create({
      username: req.body.username,
      category: "patient",
      password: crypto.randomBytes(20).toString("hex"),
    });
    return res.json(200, {
      message: "Patient Registered",
      success: true,
    });
  }
  // if patient already register then we just return the details of the patient
  return res.json(200, {
    message: "Patient Already Register",
    success: true,
    data: {
      patient: patient,
    },
  });
};

// when a create report url come then this function will create a  report for a perticular patient
module.exports.createReport = async function (req, res) {
  try {
    // finding the patient by id
    let patient = User.findById(req.params.id);
    console.log("patient", patient);
    // if patient not available then retunr response
    if (!patient) {
      return res.json(400, {
        message: "Patient not Available",
      });
    }
    // if patient available then create a report
    let report = await Report.create({
      status: req.body.status,
      date: req.body.date,
      doctor: req.body.doctor,
      patient: req.params.id,
    });
    console.log("three");
    // patient.reports.push(report);
    // patient.save();
    console.log("four");
    return res.json(200, {
      message: "Report Created SuccessFully!",
      success: true,
    });
  } catch (err) {
    return res.json(400, {
      message: "Internal Server Error",
    });
  }
};

// when a all report request come then it show the all report for a perticular patient
module.exports.allReport = async function (req, res) {
  // finding the Patient
  let patient = await User.findById(req.params.id);
  // if patient not found then return response
  if (!patient) {
    return res.json(400, {
      message: "Patient not Available",
    });
  }
  // finding the all reports of the perticluar patient
  let reports = await Report.find({ patient: req.params.id });
  // craeting the new array for all reports without other details
  var reportsArr = new Array(reports.length);
  for (let i of reports) {
    // for removing the extra deatils
    reportsArr.push(i.toObject());
  }
  return res.json(200, {
    message: "All Reports",
    success: true,
    reports: reportsArr,
  });
};

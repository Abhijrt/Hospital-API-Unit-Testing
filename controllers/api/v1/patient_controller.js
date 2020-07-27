// importing the user model
const Patient = require("../../../models/patient");

// importing the report model
const Report = require("../../../models/report");

// importing the crypto for generating the random passwor din encrypted form
const crypto = require("crypto");

// when a patient register url call then this function register the patient
module.exports.register = async function (req, res) {
  // finding the patient if alreay register
  let patient = await Patient.findOne({ phone: req.body.phone });
  // if patient not found then register it and returning response
  if (!patient) {
    Patient.create({
      phone: req.body.phone,
      doctor: req.user._id,
    });
    return res.json(200, {
      message: "Patient Registered",
      success: true,
    });
  }
  // if patient already register then we just return the details of the patient
  return res.status(200).json({
    message: "Patient Already Register",
    success: true,
    data: {
      patient: patient.toObject(),
    },
  });
};

// when a create report url come then this function will create a  report for a perticular patient
module.exports.createReport = async function (req, res) {
  try {
    // finding the patient by id
    let patient = await Patient.findById(req.params.id);
    // if patient not available then retunr response
    if (!patient) {
      return res.json(200, {
        message: "Patient not Available",
        success: true,
      });
    }
    if (!req.body.status || req.body.status.length == 0) {
      return res.status(422).json({
        message: "Please enter the status of report",
        success: true,
      });
    }

    // if patient available then create a report
    let report = await Report.create({
      status: req.body.status,
      date: req.body.date,
      doctor: req.user._id,
      patient: req.params.id,
    });
    if (report) {
      return res.json(200, {
        message: "Report Created SuccessFully!",
        success: true,
      });
    }
    return res.status(200).json({
      message: "Not Created Report",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.json(400, {
      message: "Internal Server Error",
    });
  }
};

// when a all report request come then it show the all report for a perticular patient
module.exports.allReport = async function (req, res) {
  // finding the Patient
  let patient = await Patient.findById(req.params.id);
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

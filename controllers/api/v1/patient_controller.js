const User = require("../../../models/users");
const Report = require("../../../models/report");
const passport = require("passport");
const crypto = require("crypto");

module.exports.register = async function (req, res) {
  let patient = await User.findOne({ username: req.body.username });
  if (!patient) {
    User.create({
      username: req.body.username,
      category: "patient",
      password: crypto.randomBytes(20).toString("hex"),
    });
    return res.json(200, {
      message: "Patient Registered",
    });
  }
  return res.json(200, {
    message: "Patient Already Register",
    data: {
      patient: patient,
    },
  });
};

module.exports.createReport = async function (req, res) {
  try {
    let patient = User.findById(req.params.id);
    console.log("patient", patient);
    if (!patient) {
      return res.json(400, {
        message: "Patient not Available",
      });
    }
    let report = await Report.create({
      status: req.body.status,
      date: req.body.date,
      doctor: req.body.doctor,
      patient: req.params.id,
    });
    console.log("three");
    patient.reports.push(report);
    patient.save();
    console.log("four");
    return res.json(200, {
      message: "Report Created SuccessFully!",
    });
  } catch (err) {
    return res.json(400, {
      message: "Internal Server Error",
    });
  }
};

module.exports.allReport = async function (req, res) {
  let patient = await User.findById(req.params.id);
  if (!patient) {
    return res.json(400, {
      message: "Patient not Available",
    });
  }
  let reports = await Report.find({ patient: req.params.id });
  return res.json(200, {
    message: "All Reports",
    reports: reports,
  });
};

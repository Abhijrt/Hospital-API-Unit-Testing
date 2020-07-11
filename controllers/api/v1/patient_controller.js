const User = require("../../../models/users");
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

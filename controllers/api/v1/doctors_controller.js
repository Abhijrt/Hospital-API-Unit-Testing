const Doctor = require("../../../models/doctors");
const jwt = require("jsonwebtoken");

module.exports.register = async function (req, res) {
  try {
    console.log(req.body);
    if (req.body.password == req.body.confirm_password) {
      let doctor = await Doctor.findOne({ name: req.body.name });
      if (!doctor) {
        Doctor.create({
          name: req.body.name,
          password: req.body.password,
        });
        return res.json(200, {
          message: "User Registered SuccessFully!",
        });
      } else {
        return res.json(400, {
          message: "user Already Present ! Login directly",
        });
      }
    } else {
      return res.json(400, {
        message: "Password and confirm password must be same",
      });
    }
  } catch (err) {
    return res.json(400, {
      message: "Interval Server Error",
    });
  }
};

module.exports.createSession = async function (req, res) {
  try {
    let doctor = await Doctor.findOne({ name: req.body.name });
    if (!doctor || doctor.password != req.body.password) {
      return res.json(422, {
        message: "Invalid username or Password",
      });
    }
    return res.json(200, {
      message: "Sign in Successfull",
      data: {
        token: jwt.sign(doctor.toJSON(), "hospital", { expiresIn: "10000" }),
      },
    });
  } catch (err) {
    return res.json(400, {
      message: "Internal Server Error",
    });
  }
};

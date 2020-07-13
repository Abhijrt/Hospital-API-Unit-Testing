const User = require("../../../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.register = async function (req, res) {
  try {
    if (req.body.password == req.body.confirm_password) {
      let doctor = await User.findOne({ username: req.body.username });
      let password = req.body.password;
      let newPassword = await bcrypt.hash(password, 10);
      if (!doctor) {
        User.create({
          username: req.body.username,
          password: newPassword,
          category: "doctor",
        });
        return res.status(200).json({
          message: "User Registered SuccessFully!",
          success: true,
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
      message: "Internal Server Error",
    });
  }
};

module.exports.createSession = async function (req, res) {
  try {
    let doctor = await User.findOne({ username: req.body.username });
    let doctorPassword = await bcrypt.compare(
      req.body.password,
      doctor.password
    );
    if (!doctor || !doctorPassword) {
      return res.json(422, {
        message: "Invalid username or Password",
      });
    }
    return res.json(200, {
      message: "Sign in Successfull",
      success: true,
      data: {
        token: jwt.sign(doctor.toJSON(), "hospital", { expiresIn: "1000000" }),
      },
    });
  } catch (err) {
    return res.json(400, {
      message: "Internal Server Error",
    });
  }
};

// Importing the user model
const User = require("../../../models/users");

// importing the jsonwebtoken for generating the goken
const jwt = require("jsonwebtoken");

// importing hte bcryt form password encryption
const bcrypt = require("bcrypt");

// when a doctor registration url call then this will register the doctor
module.exports.register = async function (req, res) {
  try {
    // if password and confirmPassword match then
    if (req.body.password == req.body.confirm_password) {
      // finding the doctor if already registered
      let doctor = await User.findOne({ username: req.body.username });
      let password = req.body.password;
      // encrypted the password
      let newPassword = await bcrypt.hash(password, 10);
      // if doctor not register already then register it
      if (!doctor) {
        User.create({
          username: req.body.username,
          password: newPassword,
          category: "doctor",
        });
        // sending the response after registering the doctor
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

// when doctor login url call then this function login the doctor
module.exports.createSession = async function (req, res) {
  try {
    // finding the doctor that are present in the database or not by username
    let doctor = await User.findOne({ username: req.body.username });
    // comparing the doctor password and requested password
    let doctorPassword = await bcrypt.compare(
      req.body.password,
      doctor.password
    );
    // if doctor not present or password not match then
    if (!doctor || !doctorPassword) {
      return res.json(422, {
        message: "Invalid username or Password",
      });
    }
    // if doctor is present and password match then we send the response with token
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

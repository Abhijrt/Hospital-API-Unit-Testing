const Doctor = require("../../../models/doctors");

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

  // return res.json(200, {
  //   message: "Registration page",
  // });
};

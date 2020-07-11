const Patient = require("../../../models/patients");

module.exports.register = async function (req, res) {
  let patient = await Patient.findOne({ phone: req.body.phone });
  if (!patient) {
    Patient.create({
      phone: req.body.phone,
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

const Report = require("../../../models/report");

module.exports.report = async function (req, res) {
  let reports = await Report.find({ status: req.params.status });
  return res.json(200, {
    messsage: "All Status",
    reports: reports,
  });
};

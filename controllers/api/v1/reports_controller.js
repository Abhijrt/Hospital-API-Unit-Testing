const Report = require("../../../models/report");
const { createIndexes } = require("../../../models/report");

module.exports.report = async function (req, res) {
  let reports = await Report.find({ status: req.params.status });
  var reportsArr = new Array(reports.length);
  for (let i of reports) {
    var ans = i.toObject();
    console.log(ans);
    reportsArr.push(i.toObject());
  }
  return res.status(200).json({
    messsage: "All Status",
    reports: reportsArr,
  });
};

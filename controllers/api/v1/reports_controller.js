// importing the report model
const Report = require("../../../models/report");

// when a status report url call then this funciton return the response
module.exports.report = async function (req, res) {
  // search for the reports for perticular status
  let reports = await Report.find({ status: req.params.status });

  if (reports.length !== 0) {
    // creating the new array
    var reportsArr = new Array(reports.length);
    for (let i of reports) {
      // removing the extra details
      var ans = i.toObject();
      reportsArr.push(i.toObject());
    }
    return res.status(200).json({
      message: "All Status",
      success: true,
      reports: reportsArr,
    });
  }
  return res.status(200).json({
    message: "Not Available any report",
    success: true,
  });
};

module.exports.home = function (req, res) {
  return res.json(200, {
    message: "It a Home of Hospital API",
    success: true,
  });
};

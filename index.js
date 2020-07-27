// importing the express server
const express = require("express");

// Giving the port number on which the server run
const port = 8000;

// take the server as a app
const app = express();

// tell the server to use database
const db = require("./config/mongoose");

// to use req parameter for data
app.use(express.urlencoded());

// tell the server to use jwt strategy
const passportJWT = require("./config/passport-jwt-strategy");

// tell the app to use the router
app.use("/", require("./routes"));

// tell the server to run on the port number 800
app.listen(port, function (err) {
  if (err) {
    console.log("Error on connecting to the Server");
    return;
  }
  console.log(`Connected Successfully to the server on port number ${port}`);
});

module.exports = app;

// importing the chai
const chai = require("chai");

// importing the server index.js file
const server = require("../index");

// importing the chai Http
const chaiHttp = require("chai-http");

// assertion style
chai.should();

// tell chai to use chaiHttp request
chai.use(chaiHttp);

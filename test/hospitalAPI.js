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

const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFkNTk3MDhiNjJjMjBhNTE2NGYxNDYiLCJ1c2VybmFtZSI6ImFiaGkuanJ0MTJAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkeG9xRWxCNkFNVFlXVWZ3WWhQNENydXZkbTZWZUV6WElVUUx5SHZYcTE4a3BmMmJqMEhjVzIiLCJjcmVhdGVkQXQiOiIyMDIwLTA3LTI2VDEwOjIyOjQwLjIwMVoiLCJ1cGRhdGVkQXQiOiIyMDIwLTA3LTI2VDEwOjIyOjQwLjIwMVoiLCJfX3YiOjAsImlhdCI6MTU5NTg0NDk3NiwiZXhwIjoxMDAwMTU5NTg0NDk3Nn0.IOCFs769UYtoc9ICo279o6kEe8aB8Ylo8iXtPBnjEvc";

let patient_one = {
  phone: 12365454444,
};

let patient_two = {
  phone: 12345767889,
};

describe("API Tasks ", () => {
  describe("GET /api/v1/patient/register", () => {
    it("It return the newly created Patient ", (done) => {
      chai
        .request(server)
        .post("/api/v1/patient/register")
        .set({
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${authToken}`,
        })
        .send(patient_one)
        .end((err, response) => {
          // console.log(patient_one);
          // console.log("F", response);
          response.should.have.status(200);
          response.body.should.have
            .property("message")
            .eq("Patient Registered");
          response.body.should.have.property("success").eq(true);
          done();
        });
    });
    it("It return the Older created Patient ", (done) => {
      chai
        .request("http://localhost:8000")
        .post("/api/v1/patient/register")
        .set("content-type", "application/x-www-form-urlencoded")
        .set({ Authorization: `Bearer ${authToken}` })
        .send(patient_two)
        .end((err, response) => {
          // console.log(patient_two);
          // console.log("Hiii", response);
          response.should.have.status(200);
          response.body.should.have
            .property("message")
            .eq("Patient Already Register");
          response.body.should.have.property("success").eq(true);
          response.body.should.have.property("data");
          response.body.data.should.have.property("patient");
          // response.body.data.should.have.property("__id");
          done();
        });
    });
  });
});

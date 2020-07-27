// importing the chai
const chai = require("chai");

// importing the server index.js file
const server = require("../index");

// importing the chai Http
const chaiHttp = require("chai-http");
const { response } = require("express");

// assertion style
chai.should();

// tell chai to use chaiHttp request
chai.use(chaiHttp);

const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFkNTk3MDhiNjJjMjBhNTE2NGYxNDYiLCJ1c2VybmFtZSI6ImFiaGkuanJ0MTJAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkeG9xRWxCNkFNVFlXVWZ3WWhQNENydXZkbTZWZUV6WElVUUx5SHZYcTE4a3BmMmJqMEhjVzIiLCJjcmVhdGVkQXQiOiIyMDIwLTA3LTI2VDEwOjIyOjQwLjIwMVoiLCJ1cGRhdGVkQXQiOiIyMDIwLTA3LTI2VDEwOjIyOjQwLjIwMVoiLCJfX3YiOjAsImlhdCI6MTU5NTg0NDk3NiwiZXhwIjoxMDAwMTU5NTg0NDk3Nn0.IOCFs769UYtoc9ICo279o6kEe8aB8Ylo8iXtPBnjEvc";

describe("API Tasks ", () => {
  describe("POST /api/v1/admin/patient/register", () => {
    let patient1 = {
      phone: 123456789,
    };

    let patient2 = {
      phone: 123454321,
    };

    it("It return the newly created Patient ", (done) => {
      chai
        .request("http://localhost:8000")
        .post("/api/v1/patient/register")
        .set("content-type", "application/x-www-form-urlencoded")
        .set({ Authorization: `Bearer ${authToken}` })
        .send(patient1)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have
            .property("message")
            .eq("Patient Registered");
          response.body.should.have.property("success").eq(true);
          done();
        });
    });
  });
});

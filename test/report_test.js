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

// jwt token
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFkNTk3MDhiNjJjMjBhNTE2NGYxNDYiLCJ1c2VybmFtZSI6ImFiaGkuanJ0MTJAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkeG9xRWxCNkFNVFlXVWZ3WWhQNENydXZkbTZWZUV6WElVUUx5SHZYcTE4a3BmMmJqMEhjVzIiLCJjcmVhdGVkQXQiOiIyMDIwLTA3LTI2VDEwOjIyOjQwLjIwMVoiLCJ1cGRhdGVkQXQiOiIyMDIwLTA3LTI2VDEwOjIyOjQwLjIwMVoiLCJfX3YiOjAsImlhdCI6MTU5NTg0NDk3NiwiZXhwIjoxMDAwMTU5NTg0NDk3Nn0.IOCFs769UYtoc9ICo279o6kEe8aB8Ylo8iXtPBnjEvc";

//   testing the reports
describe("Report API ", () => {
  describe("GET /reports/:status", () => {
    //   when the perticular status report return
    it("It check for the report acc to the status", (done) => {
      chai
        .request(server)
        .get("/api/v1/reports/negative")
        .set({
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${authToken}`,
        })
        .end((err, response) => {
          //   console.log(response.body);
          response.should.have.status(200);
          response.body.should.have.property("message").eq("All Status");
          response.body.should.have.property("success").eq(true);
          done();
        });
    });

    // if any perticular status report not avaliable
    it("It check for the report acc to the status is not avaliable", (done) => {
      chai
        .request(server)
        .get("/api/v1/reports/negativeeee")
        .set({
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${authToken}`,
        })
        .end((err, response) => {
          console.log(response.body);
          response.should.have.status(200);
          response.body.should.have
            .property("message")
            .eq("Not Available any report");
          response.body.should.have.property("success").eq(true);
          done();
        });
    });
  });
});

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

// patient one input
let patient_one = {
  phone: 1111166666,
};

// patinet two input
let patient_two = {
  phone: 12345767889,
};

describe("Patient API ", () => {
  // perform test for patient Registration
  describe("GET /api/v1/patient/register", () => {
    // this is for the newly register patient if new Register is done
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
          response.should.have.status(200);
          response.body.should.have
            .property("message")
            .eq("Patient Registered");
          response.body.should.have.property("success").eq(true);
          done();
        });
    });

    // this is for the older patient if not register just
    it("It return the Older created Patient ", (done) => {
      chai
        .request(server)
        .post("/api/v1/patient/register")
        .set("content-type", "application/x-www-form-urlencoded")
        .set({ Authorization: `Bearer ${authToken}` })
        .send(patient_two)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have
            .property("message")
            .eq("Patient Already Register");
          response.body.should.have.property("success").eq(true);
          response.body.should.have.property("data");
          response.body.data.should.have.property("patient");
          done();
        });
    });

    // when the unauthorized user want to create report
    it("It check for the token is valid or not", (done) => {
      chai
        .request(server)
        .post("/api/v1/patient/register")
        .set({
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Bearer `,
        })
        .send(patient_two)
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });

    // when a create report call
    describe("GET /patient/:id/create_report", () => {
      // this is for the newly created report
      it("It check for the newly created Reports", (done) => {
        chai
          .request(server)
          .get("/api/v1/patient/5f1eb1245c893207bba3cf38/create_report")
          .set({
            "content-type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${authToken}`,
          })
          .send({
            status: "Negative",
            date: "12",
          })
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.have
              .property("message")
              .eq("Report Created SuccessFully!");
            response.body.should.have.property("success").eq(true);
            done();
          });
      });

      // it run when the status is empty
      it("It check for the status is empty", (done) => {
        chai
          .request(server)
          .get("/api/v1/patient/5f1eb1245c893207bba3cf38/create_report")
          .set({
            "content-type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${authToken}`,
          })
          .send({
            status: "",
            date: "12",
          })
          .end((err, response) => {
            response.should.have.status(422);
            response.body.should.have
              .property("message")
              .eq("Please enter the status of report");
            response.body.should.have.property("success").eq(true);
            done();
          });
      });

      // when the patient id is not valid
      it("It check for the patient id is not valid", (done) => {
        chai
          .request(server)
          .get("/api/v1/patient/5f1eb1245c893207bba3cf39/create_report")
          .set({
            "content-type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${authToken}`,
          })
          .send({
            status: "Positive",
            date: "12",
          })
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.have
              .property("message")
              .eq("Patient not Available");
            response.body.should.have.property("success").eq(true);
            done();
          });
      });
      // when the unauthorized user want to create report
      it("It check for the token is valid or not", (done) => {
        chai
          .request(server)
          .get("/api/v1/patient/5f1eb1245c893207bba3cf39/create_report")
          .set({
            "content-type": "application/x-www-form-urlencoded",
            Authorization: `Bearer `,
          })
          .send({
            status: "Positive",
            date: "12",
          })
          .end((err, response) => {
            response.should.have.status(401);
            done();
          });
      });
    });

    describe("Get /reports/:id/all_reports", () => {
      // it return the all reports
      it("It show all the reports", (done) => {
        chai
          .request(server)
          .get("/api/v1/patient/5f1eb1245c893207bba3cf38/all_reports")
          .end((err, response) => {
            response.should.have.status(200);

            response.body.should.have.property("message").eq("All Reports");
            response.body.should.have.property("success").eq(true);
            done();
          });
      });

      // if perticular patient report not avaliable
      it("It test the patient does not have reports", (done) => {
        chai
          .request(server)
          .get("/api/v1/patient/5f1ed13074786818abff7d30/all_reports")
          .end((err, response) => {
            console.log(response.body);
            response.should.have.status(200);
            response.body.should.have
              .property("message")
              .eq("Patient Dont have reports");
            response.body.should.have.property("success").eq(true);
            done();
          });
      });
    });
  });
});

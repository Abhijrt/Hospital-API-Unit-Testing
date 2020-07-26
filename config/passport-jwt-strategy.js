const passport = require("passport");

// importing the jwt Strategy
const JWTStrategy = require("passport-jwt").Strategy;

// importing the extractJWt
const ExtractJWT = require("passport-jwt").ExtractJwt;

// importing the doctor model
const Doctor = require("../models/doctor");

// optins for the jwtStrategy
let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "hospital",
};

// tell passport to use jwt strategy
passport.use(
  new JWTStrategy(opts, function (jwtPayLoad, done) {
    Doctor.findById(jwtPayLoad._id, function (err, user) {
      // if any error come
      if (err) {
        console.log("Error in finding the user from JWT");
        return;
      }
      // if user is found
      if (user) {
        return done(null, user);
      }
      // if user is not found
      else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;

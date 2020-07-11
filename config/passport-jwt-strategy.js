const passport = require("passport");

// importing the jwt Strategy
const JWTStrategy = require("passport-jwt").Strategy;

// importing the extractJWt 
const ExtractJWT = require("passport-jwt").ExtractJwt;

// importing the doctor model
const Doctor = require("../models/doctors");


// optins for the jwtStrategy
let opts = {
    jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey : "hospital"
}

// tell passport to use jwt strategy
passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
    Doctor.findOne(jwtPayLoad._id,function(err,user){
        if(err){
            console.log('Error in finding the user from JWT');
            return;
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    });
}));

module.exports = passport;
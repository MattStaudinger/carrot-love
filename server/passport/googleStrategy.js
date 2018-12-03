const passport = require('passport');
const User = require('../models/User');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.use(new GoogleStrategy({
  clientID: process.env.GCLIENTID,
  clientSecret: process.env.GCLIENTSECRET,
  callbackURL: process.env.GCALLBACKURL
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleID: profile.id })
   .then(user => {
    if (user) {
      
      return done(null, user);
    }

    const newUser = new User({
      googleID: profile.id,
       username: "DefaultName",//profile.emails[0].value,
       email: "default@default.com" //profile.emails[0].value,
    });

    newUser.save()
    .then(user => {
      done(null, newUser);
    })
  })
  .catch(error => {
    done(error)
  }) 

  }));
const passport = require("passport");

const passportConfig = function(app) {
  //initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

//serialize user
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

//desiralize user
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

};

module.exports = passportConfig;

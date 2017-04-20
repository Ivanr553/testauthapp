const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalPassport = require("passport-local").Strategy


const User = require("../models/userModel");

router.get("/", (req, res) => {
  res.send("index");
})

router.post("/register", (req, res) => {
  let newUser = new User({
    username: req.body.username,
    password: req.body.password
  })

  User.saveUser(newUser, (err, newUser) => {
    if (err) throw err;
    res.send("Successfully registered user: "
    //  + req.body.username
      + newUser);
  })
})

passport.use(new LocalPassport(
  function(username, password, done) {
    console.log("passport used")
    User.findUserByUsername(username, (err, user) =>{
      if(err) throw err;
      if(!user) {
        console.log("no user found")
        return done(null, false, {message: "Unknown user"});
      }
      User.comparePassword(password, user.password, (err, result) => {
        if(err) throw err;
        if(result) {
          console.log("is match")
          return done(null, user);
        }
        else {
          console.log("is not match")
          console.log(password)
          console.log(user.password)
          return done(null, false, {message:"incorrect password"});
        }
      })
    })
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findUserById(id, (err, user) => {
    done(err, user);
  })
})

router.post("/authenticate", passport.authenticate("local", {successRedirect:"/", failureRedirect:"/failure"}), function(req, res) {
    res.send('worked');
  });

router.get("/failure", (req, res) => {
  res.send("failed to authenticate");
})

router.get("/profile", (req, res) => {
  res.json("profile");
})

module.exports = router;
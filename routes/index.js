const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalPassport = require("passport-local").Strategy

// const loginPage = require("../public/login.html");

const User = require("../models/userModel");

router.get("/", (req, res) => {
  res.send("index");
})

router.get("/login", (req, res) => {
  res.sendfile("./public/login.html");
})

router.get("/success", (req, res) => {
  // res.sendfile("./public/success.html");
  res.send({message: "logged in"})
})

router.post("/register", (req, res) => {
  let newUser = new User({
    username: req.body.username,
    password: req.body.password
  })

  User.saveUser(newUser, (err, newUser) => {
    if (err) throw err;
    res.sendfile("./public/registered.html");
  })
})

// router.get("/registered", (req, res) => {
//
// })

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

router.post("/authenticate", passport.authenticate("local", {successRedirect:"/success", failureRedirect:"/login"}), function(req, res) {
    console.log("user authenticated successfully");
  });

router.get("/failure", (req, res) => {
  res.send("failed to authenticate");
})

router.get("/profile", (req, res) => {
  res.json("profile");
})

module.exports = router;

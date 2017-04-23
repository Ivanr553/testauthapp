const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
<<<<<<< HEAD
const Raincheck = require("../models/raincheckModel");

router.get("/", (req, res) => {

  Raincheck.find({}, (err, rainchecks) => {
    if(err) throw(err);
    if(!rainchecks || rainchecks.length === 0) {
      console.log("no rainchecks found")
      return res.send({message: "no rainchecks found"})
    }
    else {
      console.log(rainchecks);
      return res.send({message: rainchecks});
    }
  })
})

router.post("/add", (req, res) => {
  let newRaincheck = new Raincheck({
    name: req.body.name,
    phone: req.body.phone,
    skus: req.body.skus,
    items: req.body.items,
    notes: req.body.notes
  })

  newRaincheck.save(newRaincheck, (err) => {
    if(err) throw err;
    res.send(newRaincheck.name + "'s order has been added");
  })

=======

router.get("/", (req, res) => {
  res.send({message: "Rainchecks"});
>>>>>>> c570f4ab49d183e477ead775c5a7aa0de6788d43
})

module.exports = router;

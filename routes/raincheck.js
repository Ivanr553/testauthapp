const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Raincheck = require("../models/raincheckModel");

router.get("/", (req, res) => {

  Raincheck.find({}, (err, rainchecks) => {
    if(err) throw(err);
    if(!rainchecks || rainchecks.length === 0) {
      return res.send({message: "no rainchecks found"})
    }
    else {
      return res.send({message: rainchecks});
    }
  })
});

router.post("/add", (req, res) => {
  let newRaincheck = new Raincheck({
    id: req.body.id,
    name: req.body.name,
    phone: req.body.phone,
    skus: req.body.skus,
    items: req.body.items,
    comments: req.body.comments
  })

  newRaincheck.save(newRaincheck, (err) => {
    if(err) throw err;
    res.send({message: newRaincheck.name + "'s order has been added"});
  })
});

router.post("/delete", (req, res) => {
  console.log("request made")
  console.log(req.body.id)

  Raincheck.find({_id: req.body.id}, (err, found) => {
    if(err) throw err;
  }).remove((err) => {
    if(err) throw err;
    console.log("deleted");
    res.send("deleted");
  })
  //
  // Raincheck.remove({id: ObjectId(req.body.id)}, (err) => {
  //   if(err) throw err;
  //   console.log("removed")
  //   res.send("removed")
  // })
})



module.exports = router;

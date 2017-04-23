const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

let raincheckSchema = mongoose.Schema({
  name: String,
  skus: [Number],
  items: [String],
  phone: Number,
  notes: String
},
{
  collection: "rainchecks"
});

let Raincheck = module.exports = mongoose.model("Raincheck", raincheckSchema);

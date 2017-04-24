const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

let raincheckSchema = mongoose.Schema({
  id: String,
  date: String,
  name: String,
  phone: Number,
  skus: [String],
  items: [String],
  comments: String
},
{
  collection: "rainchecks"
});

let Raincheck = module.exports = mongoose.model("Raincheck", raincheckSchema);

const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  name: Buffer,
  email: Buffer,
  dayInfected: Date,
  dayCured: Date,
  hospitalAddress: String,
  report: String,
  bloodType: String,
  coords: Array,
  token: Buffer,
  desc: String
});

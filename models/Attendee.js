const mongoose = require("mongoose");

const attendeeSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  location: { type: String, default: "Akera" },
  code: String, // serial number like 0001
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Attendee", attendeeSchema);
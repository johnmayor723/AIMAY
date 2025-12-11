import mongoose from "mongoose";

const attendeeSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  location: { type: String, default: "Akera" },
  code: String // serial number like 0001
});

export default mongoose.model("Attendee", attendeeSchema);

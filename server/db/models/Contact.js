const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    Fullname: { type: String, required: true },  // Fullname should be a String, not Number
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }  // Correct placement of timestamps option
);

const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;

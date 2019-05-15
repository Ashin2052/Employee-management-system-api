const mongoose = require("mongoose");

var employeeSchema = new mongoose.Schema({
  name: {
    type: String
  },
  isadmin: {
    type: Boolean,
    default: false
  },
  isemployee: {
    type: Boolean,

    default: true
  },

  password: {
    type: String
  },

  email: {
    type: String
  },
  contact: {
    type: String
  },
  address: {
    type: String
  },
  gender: {
    type: String
  },
  age: {
    type: Number
  },

  role: {
    type: Number,
    default: 0
  }
});

const employeeContact = mongoose.model("employeeContact", employeeSchema);
module.exports = employeeContact;

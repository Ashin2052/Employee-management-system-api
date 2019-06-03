const mongoose = require("mongoose");

var employeeSchema = new mongoose.Schema({
    fullName: {
    type: String,
    required:true

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
    type: String,
    required:true

  },

  email: {
    type: String,
    required:true,unique: true 
  },
  contact: {
    type: String,
    required:true

  },
  address: {
    type: String,
    required:true

  },
  gender: {
    type: String,
    required:true

  },
  DoB: {
    type: Date,
    required:true

  },

  role: {
    type: Number,
    default: 0
  }
},
{timestamps: true}
);

const employeeContact = mongoose.model("employeeContact", employeeSchema);
module.exports = employeeContact;

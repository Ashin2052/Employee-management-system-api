const mongoose = require("mongoose");

var employeeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    isadmin: {
      type: Boolean,
      default: false
    },

    password: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },
    contact: {
      type: String,
      // required: true
    },
    address: {
      type: String,

    },
    gender: {
      type: String,

    },
    DoB: {
      type: Date
    },
    joinedDate: {
      type: Date
    },
    ratings: {
      type: Number,
      // required: true,
      default: 1
    }
  },
  { timestamps: true }
);

const employeeContact = mongoose.model("employeeContact", employeeSchema);
module.exports = employeeContact;

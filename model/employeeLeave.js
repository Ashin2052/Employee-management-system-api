const mongoose = require("mongoose");

const emp = require("./employeeDetails");

var employeeSchema = new mongoose.Schema({
  eid: [{ type: mongoose.Schema.ObjectId, ref: "employeeContact" }],

  employeeName:{
  type:String,
  required:true
  },
  email:{
    type:String,
    required:true
  },

  Appp:{
   type:Date
  },
  LeaveDate: {
    type: Date,
    required: true
  },

  ReturnDate: {
    type: Date,
    required: true
  },
  Approved: {
    type: Boolean,
    default: false
  },
  Description: {
    type: String,
    required:true
  }
},{timestamps: true}

);


const employeeLeave = mongoose.model("employeeLeave", employeeSchema);
module.exports = employeeLeave;

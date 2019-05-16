const employeeLeaveModels = require("../model/employeeLeave");
const employeeContact = require("../model/employeeDetails");

const jwt = require("jsonwebtoken");
const sec = require("../config");

class employeeLeave {
  constructor() {}

  ApplyLeave(payload, userId, fullName, email) {
    return new Promise((resolve, reject) => {
      var R = new Date(payload.ReturnDate);
      var L = new Date(payload.LeaveDate);
      console.log(R);
      if (L < R) {
        employeeLeaveModels({
          employeeName: fullName,
          email: email,
          eid: userId,
          ReturnDate: new Date(payload.ReturnDate),
          LeaveDate: new Date(payload.LeaveDate),
          Description: payload.Description
        })
          .save()
          .then(d => resolve(d))
          .catch(e => reject(e));
        console.log("break");
      } else {
        resolve("Enter appropriate return date return date");
      }
    });
  }

  findEmployeeAllLeave() {
    return new Promise((resolve, reject) => {
      console.log("nkj");
      employeeLeaveModels
        .find()
        .populate("eid")
        .then(d => {
          resolve(d);
          console.log(d);
        })
        .then(d => resolve(d))
        .catch(e => reject(e));
    });
  }

  ApproveLeave(Id, payload) {
    console.log(payload, "payload approve leaves");
    return new Promise((resolve, reject) => {
      console.log("ApporveLeave service called");
      employeeLeaveModels
        .findByIdAndUpdate(
          {
            _id: Id
          },
          {
            $set: payload
          },
          {
            new: true
          }
        )
        .then(d => resolve(d))
        .catch(e => reject(e));
    });
  }

  employeeApply(eid) {
    return new Promise((resolve, reject) => {
      employeeLeaveModels
        .find({ eid })
        .then(d => resolve(d))
        .catch(e => reject(e));
    });
  }
}
module.exports = new employeeLeave();

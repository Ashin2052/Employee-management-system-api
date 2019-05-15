const employeeLeaveModels = require("../model/employeeLeave");
const employeeContact = require("../model/employeeDetails");

const jwt = require("jsonwebtoken");
const sec = require("../config");

class employeeLeave {
  constructor() {}

  ApplyLeave(payload, userId, fullName) {
    return new Promise((resolve, reject) => {
      var R = new Date(payload.end_date);
      var L = new Date(payload.start_date);
      console.log(R);
      if (L < R) {
        employeeLeaveModels({
          eid: userId,
          ReturnDate: new Date(payload.end_date),
          LeaveDate: new Date(payload.start_date),
          Description: payload.reason
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
    return new Promise((resolve, reject) => {
      console.log("ada");
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

  employeeApply(payload) {
    return new Promise((resolve, reject) => {
      employeeLeaveModels
        .find({
          eid: payload.eid
        })
        .then(d => resolve(d))
        .catch(e => reject(e));
    });
  }
}
module.exports = new employeeLeave();

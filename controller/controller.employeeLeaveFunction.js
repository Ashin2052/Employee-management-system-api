const employeeLeaveModels = require("../model/employeeLeave");
const employeeContact = require("../model/employeeDetails");

const jwt = require("jsonwebtoken");
const sec = require("../config");

class employeeLeave {
  constructor() {}

  ApplyLeave(payload, userId, fullName) {
    console.log(payload, userId, "user leave data");
    return new Promise((resolve, reject) => {
      employeeLeaveModels({
        eid: userId,
        ReturnDate: new Date(payload.start_date),
        LeaveDate: new Date(payload.end_date),
        Description: payload.reason
      })
        .save()
        .then(d => resolve(d))
        .catch(e => {
          console.log(e, "apply leave error");
          reject(e);
        });
      console.log("break");
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
        .catch(e => reject(e));
    });
  }
  MakeAdmin(payload) {
    return new Promise((resolve, reject) => {
      console.log("ada");
      employeeContact
        .findOneAndUpdate(
          {
            _id: payload.userId
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
}
module.exports = new employeeLeave();

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
        .then(async d => {
          employeeLeaveModels
            .findById(Id)
            .then(async c => {
              await mailer.sendMail(
                "mahat.ashin@gmail.com",
                "mahat.ashin@hotmail.com",
                "approved",
                `<p>thank you</p>`
              );
              console.log(c.email, "approved email");
            })
            .catch(f => reject(f));

          resolve(d);
        })
        .catch(e => reject(e));
    });
  }

employeeApply(eid)
{
    return new Promise((resolve,reject)=>
    {
        employeeLeaveModels.find({eid})
        .then(d=>resolve(d))
        .catch(e=>reject(e));
    })
}

MakeAdmin(payload)
{
    return new Promise((resolve,reject)=>
{
employeeContact.findOneAndUpdate({
    
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
})
}
}
module.exports = new employeeLeave();

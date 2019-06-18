const employeeLeaveModels = require("../model/employeeLeave");
const employeeContact = require("../model/employeeDetails");
const mailer = require("../services/mailer");
const httpResponse = require("../errorhandling/errorhandler");

class employeeLeave {
  constructor() {}

  //Applyleave

  applyLeave(payload, userId, fullName, email) {
    return new Promise((resolve, reject) => {
      var return_date = new Date(payload.ReturnDate);
      var leave_Date = new Date(payload.LeaveDate);
      if (leave_Date < return_date) {
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
        reject({
          statusCode: 403,
          message: "return date less then leave date"
        });
      }
    });
  }

  //findEmployeAll leave list

  empLeaveList(isadmin) {
    if (isadmin) {
      return employeeLeaveModels.find().populate("eid");
    } else {
      console.log("false");
      return Promise.reject({ statusCode: 403, message: "you are not admin" });
    }
  }

  //Approve ;leave
  approveLeave(payload, isadmin) {
    return new Promise((resolve, reject) => {
      if (isadmin) {
        console.log("payloadn id", payload.Id);
        //  mailer.sendMail("mahat.ashin@hotmail.com", "mahat.ashin@gmail.com", "approved", `<p>thank you</p>`);

        employeeLeaveModels
          .findOneAndUpdate(
            {
              _id: payload.Id
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
              .findById(payload.Id)
              .then(async c => {
                if (c.Approved) {
                  console.log(c.email, "approved email");

                  await mailer.sendMail(
                    "mahat.ashin@hotmail.com",
                    c.email,
                    "sabin",
                    `<p>your vacancy has been approved</p>`
                  );
                  //  console.log(c.email,"approved email")
                } else {
                  await mailer.sendMail(
                    "mahat.ashin@hotmail.com",
                    c.email,
                    "sabin",
                    `<p>your vacancy is dis approved</p>`
                  );
                  //  console.log(c.email,"approved email")
                }
              })
              .catch(e => reject(e));

            resolve(d);
          })
          .catch(e => reject(e));
      } else {
        reject({ statusCode: 403, message: "you are not admin" });
      }
    });
  }

  //employeeApply
  paticularEmployeeLeaveList(eid, isadmin) {
    return new Promise((resolve, reject) => {
      if (isadmin) {
        employeeLeaveModels
          .find({ eid })
          .then(d => resolve(d))
          .catch(e => reject(e));
      } else {
        reject({ statusCode: 403, message: "you are not admin" });
      }
    });
  }

  //MakeAdmin
  makeAdmin(payload, isadmin) {
    return new Promise((resolve, reject) => {
      if (isadmin) {
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
      } else {
        reject({ statusCode: 403, message: "you are not admin" });
      }
    });
  }
}
module.exports = new employeeLeave();

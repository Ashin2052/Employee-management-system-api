const mongoose = require("mongoose");
const employee_Contact = require("../model/employeeDetails");
const employee_Leave_Details = require("../model/employeeLeave");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
const jwt = require("jsonwebtoken");
const sec = require("../config");
const Cerifier = require("email-verifier");

class employee {
  constructor() {}

  signUp(payload, isadmin) {
    return new Promise((resolve, reject) => {
      if (isadmin) {
        employee_Contact
          .findOne({
            email: payload.email
          })
          .then(user => {
            if (user) {
              reject("email already exist");
            } else {
              let obj = new employee_Contact(payload);
              const encryptedString = cryptr.encrypt(payload.password);
              obj.password = encryptedString;
              (obj.DoB = new Date(payload.DoB)),
                obj
                  .save()
                  .then(d => {
                    let result = this.mapObject(d);
                    resolve(result);
                  })
                  .catch(e => reject(e));
              console.log("signup successful");
            }
          });
      } else {
        resolve("you are not admin");
      }
    });
  }

  //login
  login(payload) {
    return new Promise((resolve, reject) => {
      employee_Contact
        .findOne({
          email: payload.email
        })
        .then(user => {
          console.log(user, "pass");
          if (!user) {
            resolve("user does not exist");
          } else {
            const decryptPassword = cryptr.decrypt(user.password);
            if (payload.password == decryptPassword) {
              const jwtToken = jwt.sign(
                {
                  gender: user.gender,
                  _id: user._id,
                  fullName: user.fullName,
                  email: user.email,
                  password: user.password,
                  mobile: user.mobile,
                  address: user.address,
                  isadmin: user.isadmin
                },
                sec.secrec,
                {
                  expiresIn: "24h"
                }
              );

              const UseTok = {
                jwtToken,
                user
              };

              resolve(UseTok);
            } else {
              reject({ statusCode: 403, message: "password incorrect" });
            }
          }
        });
    });
  }

  //get approve details

  getApproveDetails(user_Id) {
    return new Promise((resolve, reject) => {
      employeeLeaveDetails
        .find({
          eid: user_Id
        })
        .then(ediDetails => {
          var Elen = ediDetails.length;
          resolve(ediDetails[Elen - 1]);
        })
        .catch(e => reject(e));
    });
  }

  //get all employee
  getAllEmployee(isadmin) {
    return new Promise((resolve, reject) => {
      if (isadmin) {
        employee_Contact
          .find()
          .then(d => {
            let result = this.mapObject(d);
            resolve(result);
          })
          .catch(e => reject(e));
      } else {
        reject({ statusCode: 403, message: "you are not admin" });
      }
    });
  }

  mapObject(employee) {
    if (employee.length > 0) {
      return employee.map(x => {
        return {
          gender: x.gender,
          _id: x._id,
          fullName: x.fullName,
          email: x.email,
          mobile: x.mobile,
          address: x.address,
          isadmin: x.isadmin,
          DoB: x.DoB
        };
      });
    } else {
      return {
        gender: employee.gender,
        _id: employee._id,
        fullName: employee.fullName,
        email: employee.email,
        mobile: employee.mobile,
        address: employee.address,
        isadmin: employee.isadmin,
        DoB: employee.DoB
      };
    }
  }

  //find particular employee
  getParticularEmployee(userId) {
    return new Promise((resolve, reject) => {
      // if (isadmin) {
      console.log("employee get", userId);
      employee_Contact
        .findById(userId)
        .then(d => resolve(d))
        .catch(e => reject(e));
      // } else {
      //   reject({ statusCode: 403, message: "you are not admin" });
      // }
    });
  }

  //update employee details

  update(userId, isadmin, Uid, payload) {
    return new Promise((resolve, reject) => {
      if (isadmin || userId == Uid) {
        console.log("ada");
        employee_Contact
          .findOneAndUpdate(
            {
              _id: userId
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
        reject({ statusCode: 500, message: "authentication fail" });
      }
    });
  }

  //remove employee
  removeEmployee(userId, isadmin) {
    return new Promise((resolve, reject) => {
      if (isadmin) {
        employee_Contact
          .findByIdAndDelete(userId)
          .then(d =>
            this.removeEmployeeLeave(userId, isadmin)
              .then(e => resolve(e))
              .catch(c => reject(c))
          )
          .catch(e => reject(e));
      } else {
        reject({ statusCode: 403, message: "you are not admin" });
      }
    });
  }

  //remove employee leave
  removeEmployeeLeave(eid, isadmin) {
    console.log("eid", eid);
    return new Promise((resolve, reject) => {
      if (isadmin) {
        console.log("entr if statement");
        employee_Leave_Details
          .deleteMany({ eid: eid })
          .then(d => resolve(d))
          .catch(d => reject(d));
      } else {
        reject({ statusCode: 403, message: "you are not admin" });
      }
    });
  }

  //reset password

  resetPassword(userId, payload) {
    return new Promise((resolve, reject) => {
      employee_Contact.findById(userId).then(d => {
        const existingEncryptedString = cryptr.decrypt(d.password);
        console.log(existingEncryptedString);
        if (existingEncryptedString == payload.currentpassword) {
          if (payload.newPassword) {
            const encryptedString = cryptr.encrypt(payload.newPassword);

            employee_Contact
              .findOneAndUpdate(
                {
                  _id: userId
                },
                {
                  $set: { password: encryptedString }
                }
              )
              .then(f => resolve(f))
              .catch(e => reject(e));
          } else {
            reject({
              statusCode: 500,
              message: "you haven't entered any new password"
            });
          }
        } else {
          resolve({
            statusCode: 500,
            message: "enter correct current password"
          });
        }
      });
    });
  }
}

module.exports = new employee();

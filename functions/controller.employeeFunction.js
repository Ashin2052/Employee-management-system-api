const mongoose = require("mongoose");
const employeeContact = require("../model/employeeDetails");
const employeeLeaveDetails=require('../model/employeeLeave')
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");
const jwt = require("jsonwebtoken");
const sec = require("../config");

class employee {
  constructor() {}

  signUp(payload,isadmin) {

    
    return new Promise((resolve, reject) => {
      if(isadmin){
    //   let verifier = new Verifier("https://emailverification.whoisxmlapi.com/api/v1?apiKey=at_6yki4sbvWdEfP4Don22wi8Wot8WTQ&emailAddress=support@whoisxmlapi.com");

    //  verifier.verify("mahat.ashin@gmail.com", (err, data) => {
    //    console.log(payload.email)
    //     if (err) {
    //       console.log("error")
    //     }
    //     console.log(data);
    // });
      console.log("dada", payload.fullName);
      employeeContact
        .findOne({
          email: payload.email
        })
        .then(user => {
          console.log(user, "user signup");
          if (user) {
            resolve("user already exist");
          } else {

            let obj = new employeeContact(payload);
            // obj.email=payload.email;
            // validator.validate(obj.email); // true
            //  console.log(obj.email)
            const encryptedString = cryptr.encrypt(payload.password);
            obj.password = encryptedString;
            obj.DoB=new Date(payload.DoB),

            obj
              .save()
              .then(d => resolve(d))
              .catch(e => reject(e));
            console.log("break");
          }
        });
    }
    else{
      resolve("you are not admin")
    }
  });
  
  }
  
  
//login
  login(payload) {
    return new Promise((resolve, reject) => {
      console.log("adka ajdk");
      employeeContact
        .findOne({
          email: payload.email
        })
        .then(user => {
          console.log(user,"pass")
          if (!user) {
            resolve("user does not exist");
          } else {
            const decryptPassword = cryptr.decrypt(user.password);
            if (payload.password == decryptPassword) {
              console.log(user.email,"user yess token");
              const jwtToken = jwt.sign(
                {
                
                  gender: user.gender,
                  _id: user._id,
                  fullName:user.fullName,
                  email: user.email,
                  password:user.password,
                  mobile: user.mobile,
                  address: user.address,
                  isadmin: user.isadmin
                },
                sec.secrec,
                {
                  expiresIn: "24h"
                }
              );
             
              const UseTok={
                jwtToken,user}
               
              resolve(UseTok);

              console.log("fullName",user.fullName);
            } else {
              resolve("authentication fail");
            }
          }
        });
    });
  }


  //get approve details

  getApproveDetails(userId)
  {
   const u=userId
    return new Promise((resolve, reject) => {
      employeeLeaveDetails.find({
        eid:u})
       .then(ediDetails=>{
          var Elen=ediDetails.length;
         resolve(ediDetails[Elen-1])
          
          
          
       })
       .catch(d=>reject(d))
    });
  }


  //get all employee
  getAllEmployee(isadmin) {

    
    return new Promise((resolve, reject) => {
      if(isadmin)
      {

      employeeContact
        .find()
        .then(d => resolve(d))
        .catch(e => reject(e));
    }
    else
{
    resolve("you are not an admin")
}
 });
  }


  //find particular employee
  findParticular(userId) {
    return new Promise((resolve, reject) => {
      console.log("employee get", userId);
      employeeContact
        .findById(userId)
        .then(d => resolve(d))
        .catch(e => reject(e));
      console.log("ajka");
    });
  }



  //update employee details

  update(userId,isadmin,Uid, payload) {
    return new Promise((resolve, reject) => {

      if(isadmin || userId== Uid)
      { console.log("ada");
      employeeContact
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
      }
     else
     {
       resolve("you are not an authorized")
     }
    });
  }
 

  //remove employee
  removeEmployee(userId,isadmin) {
    return new Promise((resolve, reject) => {
      if(isadmin)
      {
        employeeContact
        .findByIdAndDelete(userId)
        .then(d => resolve(d))
        .catch(e => reject(e));
      }
      else
      {
        resolve("you are not admin")
      }
      
    });
  }

  //remove employee leave 
  removeEmployeeLeave(eid,isadmin) {
    return new Promise((resolve, reject) => {
      if(isadmin)
      {
        employeeLeaveDetails
        .deleteMany({eid:eid})
        .then(d => resolve(d))
        .catch(e => reject(e));
      }
      else
      {
        resolve("you are not admin")
      }
    });
  }


  //reset password

  resetPassword(userId,email,payload)
  {

   
    return new Promise((resolve,reject)=>{

      employeeContact.findById(userId)
      .then(d=>{
        console.log(d,"d.passwrod")
        const existingEncryptedString = cryptr.decrypt(d.password);
   console.log(existingEncryptedString,"existingencrytoetd")
        if(existingEncryptedString==payload.currentpassword)
      { 
 
        if(payload.newPassword){
        const encryptedString = cryptr.encrypt(payload.newPassword);

        employeeContact.findOneAndUpdate(
          {
            _id:userId

          },
          {
            $set:{password:encryptedString}
          }
        )
        .then(f=>resolve(f))
        .catch(e=>reject(e));
        }
        else{
          resolve("enter proper password")
        }
      }
      else{
        resolve("password error")
      }
      })
      
    })
  }
}

module.exports = new employee();
 
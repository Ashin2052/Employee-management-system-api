const employeeLeaveModels = require("../model/employeeLeave");
const employeeContact = require("../model/employeeDetails");
const mailer=require('../services/mailer')
const mongooseId = require('mongoose').Schema.ObjectId
class employeeLeave {
  constructor() {}


  //Applyleave

    ApplyLeave(payload , userId,fullName,email)
    {
        return new Promise((resolve,reject)=>
        {
            var R=    new  Date(payload.ReturnDate);
            var L=   new Date(payload.LeaveDate)
            console.log(R)
            if(L<R){
            employeeLeaveModels({
                employeeName:fullName,
                email:email,
                eid:userId,
                ReturnDate:new Date(payload.ReturnDate),
                LeaveDate:new Date(payload.LeaveDate),
                Description:payload.Description
            }).save()
            .then(d=>resolve(d))
            .catch(e=>reject(e))
            console.log("break")
        }
        else
        {
            resolve("Enter appropriate return date return date");
        }
        })
    }


//findEmployeAll leave list

  findEmployeeAllLeave(isadmin) {
    if( isadmin ) {
      return employeeLeaveModels.find().populate('eid');
    }else {
      console.log('false')
     return  Promise.reject({statusCode:403})
    }
    // return new Promise((resolve, reject) => {
    //   console.log("nkj");
    //   if(isadmin){

    //     return employeeLeaveModels
    //     .find()
    //     .populate("eid")
    //     // .then(d => {
    //     //   resolve(d);
    //     //   console.log(d);
        // })
        // .catch(e => reject(e));
    //   }
    //   else{
    //     resolve("you are not an admin")
    //   }
      
    // });
  }


  //Approve ;leave
ApproveLeave(payload,isadmin)
{
    return new Promise((resolve,reject)=>
    {
      if(isadmin)
      {
        console.log("payloadn id",typeof payload.Id)
         //  mailer.sendMail("mahat.ashin@hotmail.com", "mahat.ashin@gmail.com", "approved", `<p>thank you</p>`);
 
         employeeLeaveModels
         .findOneAndUpdate(
             {
               _id:payload.Id
             },
             {
               $set: payload
             },
             {
               new: true
             }
         )
         .then(async d=> {
           console.log(d,"d jjj")
             employeeLeaveModels.findById(payload.Id)
             .then( async  c=>{
               if(c.Approved)
               {
                 console.log(c.email,"approved email")
                    
 
                 await mailer.sendMail("mahat.ashin@hotmail.com", c.email, "sabin", `<p>your vacancy has been approved</p>`);
                //  console.log(c.email,"approved email")
               }
 
              else
              {
               await mailer.sendMail("mahat.ashin@hotmail.com", c.email, "sabin", `<p>your vacancy is dis approved</p>`);
               //  console.log(c.email,"approved email")
              }
 
             })
          .catch(f=>reject(f))
 
          resolve(d)} )
         .catch(e=>reject(e));
      }
      else{
        resolve("you are not admin")
      }
    })
}


//employeeApply
employeeApply(eid,isadmin)
{
    return new Promise((resolve,reject)=>
    {
      if(isadmin) 
      {
        employeeLeaveModels.find({eid})
        .then(d=>resolve(d))
        .catch(e=>reject(e));
      } 
      else 
      {
        resolve("you are not admin");
      }
    })
}


//MakeAdmin
MakeAdmin(payload,isadmin)
{
    return new Promise((resolve,reject)=>
{
  if (isadmin) 
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
  }
  else
  {
    resolve("you are not an admin")
  }

    
})
}
}
module.exports=new employeeLeave(); 

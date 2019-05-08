const  mongoose=require('mongoose');
const employeeContact=require('../model/employeeDetails');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const jwt=require('jsonwebtoken');
const sec=require('../config')

class employee{
    constructor(){}
 
    
    signUp(payload)
    {

        return new Promise((resolve,reject)=>
        {
            console.log("dada")
            employeeContact.findOne(
                
                {
                
                    fullName:payload.fullName
                }

            )
            .then((user)=>
            {
                if(user)
                { 
                                   resolve("user exist")

            }
            
            else{
                let obj=new employeeContact(payload);
                const encryptedString = cryptr.encrypt(payload.password);
                obj.password=encryptedString;
                obj.save()
                .then(d=>resolve(d))
                .catch(e=>reject(e));
                console.log("break");
            }
            
        })
    })
    }


     login(payload)
     {
         return new Promise((resolve,reject)=>
         {
             console.log("adka ajdk");
             employeeContact.findOne(
                
                {
                
                    fullName:payload.fullName
                }

            )
             .then((user)=>{
                 if(!user)
                 {
                     resolve("user does not exist");
                 }
                 else{
                     const decryptPassword=cryptr.decrypt(user.password)
                     user.password=decryptPassword
                     if(payload.password==user.password)
                     {
                         const jwtToken=jwt.sign(
                             {
                                 fullName:user.fullName,
                                 email:user.email,
                                 mobile:user.mobile,
                                 address:user.address,
                                 gender:user.gender
                             },sec.secrec,{
                                 expiresIn:'1h'
                             }
                         )
                         resolve(jwtToken)
                         console.log('token resolved')
                     }
                     else{
                       reject('authentication fail')
                     }
                 }
             })
         })
     }

     getAllEmployee()
     {
         return new Promise((resolve,reject)=>
         {
             employeeContact.find()
             .then(d => resolve(d))
            .catch(e => reject(e));
         })
     }
  

     findParticular(userId)
     {
         return new Promise((resolve,reject)=>
         {
           console.log("employee get",userId)
           employeeContact.findById(userId)
           .then(d => resolve(d))
           .catch(e => reject(e));
           console.log("ajka")
         })
     }


    update(userId,payload)
    {
        return new Promise((resolve,reject)=>
        {

            console.log("ada")
            employeeContact.findOneAndUpdate({
                _id: userId
            }
            ,
            {
                $set:payload
            },
            {
                new:true
            })
            .then(d=>resolve(d))
            .catch(e=>reject(e));
        })
    }

    removeEmployee(userId)
    {
        return new Promise((resolve,reject)=>
        {
            employeeContact.findByIdAndRemove(userId)
            .then(d=>resolve(d))
            .catch(e=>reject(e));
        })
    }
    

}

module.exports=new employee();
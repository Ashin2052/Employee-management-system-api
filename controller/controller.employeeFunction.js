const  mongoose=require('mongoose');
const employeeContact=require('../model/employeeDetails');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

class employee{
    constructor(){}
 
    
    signUp(payload)
    {

        return new Promise((resolve,reject)=>
        {
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

}

module.exports=new employee();
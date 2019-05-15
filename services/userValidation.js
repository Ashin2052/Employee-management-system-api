const Router=require('express').Router;
const router = Router();
const jwt = require('jsonwebtoken');
const employeeContact=require('../model/employeeDetails')
const sec=require('../config')

 function validateUser( req , res ,next ){
    const token = req.headers.authorization;
    console.log(token,'token',sec.secre,'secret')
    jwt.verify(token, sec.secrec, function(err, decoded) {
       console.log(decoded,'decoded') // bar
       if( err ) return res.status(403).json({message:'User not authorized'});
req.UserId = decoded._id;
req.fullName=decoded.fullName;
req.isadmin = decoded.isadmin;
req.isEmplpoyee=decoded.isEmplpoyee;
      //  employreeeContact.findById(decoded.id)
      //  .then(res=>{
      //     console.log(res,'res');
      //  }).catch(error=>console.log(error))
       next();
     });
 }

module.exports=validateUser;
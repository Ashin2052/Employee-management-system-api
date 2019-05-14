const Router=require('express').Router;
const router=Router();

const employeeLeavefunction=require('./controller.employeeLeaveFunction');
const validateUser=require('../services/userValidation');


router.post('/ApplyLeave',validateUser,(req,res,next)=>
{
    console.log("hjhjhjh",req.UserId,req.fullName);
    employeeLeavefunction.ApplyLeave(req.body,req.UserId,req.fullName)
    .then(d=>res.json(d))
    .catch(next);
})


router.get('/AppliedEmployeeList',(req,res,next)=>
{
    employeeLeavefunction.findEmployeeAllLeave()
    .then(d=>res.json(d))
    .catch(next);
})

router.put('/Makeadmin',validateUser,(req,res,next)=>
{ 
    console.log(req.isadmin,'isadmin')
    if(req.isadmin=="true"){
    employeeLeavefunction.MakeAdmin(req.body)
    .then(d=>res.json(d))
    .catch(next);
    }
    else{
      res.json("you are not admin");
    }
})

// router.put('/Approve/:Id',(req,res,next)=>
// {

// })
 
module.exports=router;

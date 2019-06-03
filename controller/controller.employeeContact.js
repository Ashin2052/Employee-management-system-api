const Router=require('express').Router;
const router=Router();
const employeefunction=require('../functions/controller.employeeFunction');

const validateUser=require('../services/userValidation');
const schemavalidator = require('../services/schemavalidator')


//register employee
router.post('/',validateUser,schemavalidator,(req,res,next)=>
{
   
        employeefunction.signUp(req.body,req.isadmin)
    .then(d=>res.json(d))
    .catch(next);
})

//login
router.post('/login',(req,res,next)=>
{
    employeefunction.login(req.body)
    .then(d=>res.json(d))
    .catch(next);
})


  //get approve details

router.get('/getApproveDetails/:userId',validateUser,(req,res,next)=>
{
    console.log(req.params.UserId,req.UserId,"req nkj")
   
    employeefunction.getApproveDetails(req.params.userId,req.UserId)
    .then(d=>res.json(d))
    .catch(next);
   
})

  //get all employee

router.get('/getAllEmployee',validateUser,(req,res,next)=>
{
    
    employeefunction.getAllEmployee(req.isadmin)
    .then(d=>res.json(d))
    .catch(next);
})


  //reset password

router.put('/resetPassword',validateUser,schemavalidator,(req,res,next)=>
{
console.log(req.password)
employeefunction.resetPassword(req.UserId,req.email,req.body)
.then(d=>res.json(d))
.catch(next)

})

  //find particular employee

router.get('/:userId',validateUser,(req,res,next)=>
{
    
employeefunction.findParticular(req.params.userId)
.then(d=>res.json(d))
.catch(next);
})

  //update employee details

router.put('/:id',validateUser,schemavalidator,(req,res,next)=>
{     
    employeefunction.update(req.params.id,req.isadmin,req.UserId,req.body)
    .then(d=>res.json(d))
    .catch(next);
})
//

  //remove employee

router.delete('/:userId',validateUser,(req,res,next)=>
{
employeefunction.removeEmployee(req.params.userId,req.isadmin)
.then(d=>res.json(d))
.catch(next);
employeefunction.removeEmployeeLeave(req.params.userId,req.isadmin)
.then(d=>res.json(d))
.catch(next);
   
})
 

module.exports=router;
const Router=require('express').Router;
const router=Router();
const employee_function=require('../functions/employee-Function');
const validateUser=require('../services/userValidation');
const schemavalidator = require('../services/schemavalidator')
const httpResponse=require("../errorhandling/errorhandler")


//register employee
router.post('/',validateUser,schemavalidator,(req,res,next)=>{

   console.log("da",req.body)
  employee_function.signUp(req.body,req.isadmin)
    .then(d=>httpResponse.success(res, d))
    .catch(e=>httpResponse.errorHandler(res, e));
})

//login
router.post('/login',(req,res,next)=>{
  console.log( req.body,'login ')
  employee_function.login(req.body)
    .then(d=>httpResponse.success(res, d))
    .catch(e=>httpResponse.errorHandler(res, e));
})


  //get approve details

router.get('/approved/:id',validateUser,(req,res,next)=>
{
    console.log(req.params.id,req.UserId,"user id and parameter id")
   
    employee_function.getApproveDetails(req.params.id,req.UserId)
    .then(d=>httpResponse.success(res, d))
    .catch(e=>httpResponse.errorHandler(res, e));
   
})

  //get all employee

router.get('/',validateUser,(req,res,next)=>
{
    
  employee_function.getAllEmployee(req.isadmin)
    .then(d=>httpResponse.success(res, d))
    .catch(e=>httpResponse.errorHandler(res, e));
})


  //find particular employee

  router.get('/:id',validateUser,(req,res,next)=>
  {
      
    employee_function.getParticularEmployee(req.params.id,req.isadmin)
  .then(d=>httpResponse.success(res, d))
  .catch(e=>httpResponse.errorHandler(res, e));
  })

  

router.put('/:id',validateUser,schemavalidator,(req,res,next)=>
{     
  employee_function.update(req.params.id,req.isadmin,req.UserId,req.body)
    .then(d=>httpResponse.success(res, d))
    .catch(e=>httpResponse.errorHandler(res, e));
})


  //reset password

router.put('/reset-password',validateUser,schemavalidator,(req,res,next)=>
{
console.log(req.password)
employee_function.resetPassword(req.UserId,req.email,req.body)
.then(d=>httpResponse.errorHandler(res, d))
.catch(e=>httpResponse.errorHandler(res, e));
})

  //remove employee

router.delete('/:id',validateUser,(req,res,next)=>
{
  employee_function.removeEmployee(req.params.id,req.isadmin)
.then(d=>httpResponse.success(res, d))
 .catch(e=>httpResponse.errorHandler(res, e));
employee_function.removeEmployeeLeave(req.params.id,req.isadmin)
.then(d=>httpResponse.success(res, d))
.catch(e=>httpResponse.errorHandler(res, e));
   
})
 

module.exports=router;
const Router=require('express').Router;
const router=Router();

const employeeLeavefunction=require('../functions/controller.employeeLeaveFunction');
const validateUser=require('../services/userValidation');


router.post('/ApplyLeave',validateUser,(req,res,next)=>
{
    console.log("hjhjhjh",req.UserId,req.name,req.email);
    employeeLeavefunction.ApplyLeave(req.body,req.UserId,req.name,req.email)
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
    console.log(req.isadmin,"you area a admin")

    if(req.isadmin)
    {
        console.log("bheja")
    employeeLeavefunction.MakeAdmin(req.body)
    .then(d=>res.json(d))
    .catch(next);
    }
    else{
      res.json("you are not admin");
    }
})

router.put('/Approve/:Id',validateUser,(req,res,next)=>
{
    if(req.isadmin){

  employeeLeavefunction.ApproveLeave(req.params.Id,req.body)
  .then(d=>res.json(d))
  .catch(next)
    }
    else
    {
        res.json("you are not admin");

    }
})
 
router.get('/employeeApply/:eid',validateUser,(req,res,next)=>
{
    if(req.isadmin){
     console.log("req.params eid", req.params.eid)
    employeeLeavefunction.employeeApply(req.params.eid)
    .then(d=>res.json(d))
    .catch(next)
}
else
{
    res.json("you are not admin");

}
})

module.exports=router;

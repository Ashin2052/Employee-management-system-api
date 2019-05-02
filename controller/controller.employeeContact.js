const Router=require('express').Router;
const router=Router();
const employeefunction=require('./controller.employeeFunction');



router.post('/',(req,res,next)=>
{
    employeefunction.signUp(req.body)
    .then(d=>res.json(d))
    .catch(next);
})

module.exports=router;
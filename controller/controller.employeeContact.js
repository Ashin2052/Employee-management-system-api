const Router=require('express').Router;
const router=Router();
const employeefunction=require('../functions/controller.employeeFunction');

const validateUser=require('../services/userValidation');

router.post('/',validateUser,(req,res,next)=>
{
    if(req.isadmin=="true")
    {
        employeefunction.signUp(req.body)
    .then(d=>res.json(d))
    .catch(next);
    }
    else{
        res.json("you cant psot")
    }
    
})


router.post('/login',(req,res,next)=>
{
    employeefunction.login(req.body)
    .then(d=>res.json(d))
    .catch(next);
})

router.get('/getApproveDetails/:userId',validateUser,(req,res,next)=>
{
    console.log(req.params.UserId,req.UserId,"req nkj")
    if(req.params.userId==req.UserId){
    employeefunction.getApproveDetails(req.params.userId)
    .then(d=>res.json(d))
    .catch(next);
    }
    else{
        res.json("req.id mismatch")
    }
})

router.get('/getAllEmployee',validateUser,(req,res,next)=>
{
    if(req.isadmin="true")
{
    employeefunction.getAllEmployee()
    .then(d=>res.json(d))
    .catch(next);
}
else
{
    res.json("you are not an admin")
}
})

router.put('/resetPassword',validateUser,(req,res,next)=>
{
console.log(req.password)
employeefunction.resetPassword(req.UserId,req.email,req.password,req.body)
.then(d=>res.json(d))
.catch(next)

})

router.get('/:userId',validateUser,(req,res,next)=>
{
    
employeefunction.findParticular(req.params.userId)
.then(d=>res.json(d))
.catch(next);
})


router.put('/:id',validateUser,(req,res,next)=>
{     
     if(req.isadmin || req.params.id==  req.UserId)
{
    employeefunction.update(req.params.id,req.body)
    .then(d=>res.json(d))
    .catch(next);
}
else{
    res.json("rerrpr")
}
})

router.delete('/:userId',validateUser,(req,res,next)=>
{
    if(req.isadmin=="true")
    {
employeefunction.removeEmployee(req.params.userId)
.then(d=>res.json(d))
.catch(next);
employeefunction.removeEmployeeLeave(req.params.userId)
.then(d=>res.json(d))
.catch(next);
    }
    else
    {
        res.json("you are not an admin")
    }
})
 
router.put('/admin',(req,res,next)=>
{
    

})
module.exports=router;
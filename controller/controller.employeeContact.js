const Router=require('express').Router;
const router=Router();
const employeefunction=require('../functions/controller.employeeFunction');

const validateUser=require('../services/userValidation');

router.post('/',(req,res,next)=>
{
    employeefunction.signUp(req.body)
    .then(d=>res.json(d))
    .catch(next);
})


router.post('/login',(req,res,next)=>
{
    employeefunction.login(req.body)
    .then(d=>res.json(d))
    .catch(next);
})

router.get('/getAllEmployee',(req,res,next)=>
{
    employeefunction.getAllEmployee()
    .then(d=>res.json(d))
    .catch(next);
})

router.get('/:userId',validateUser,(req,res,next)=>
{
employeefunction.findParticular(req.params.userId)
.then(d=>res.json(d))
.catch(next);
})


router.put('/:id',validateUser,(req,res,next)=>
{
    employeefunction.update(req.params.id,req.body)
    .then(d=>res.json(d))
    .catch(next);
})

router.delete('/:userId',validateUser,(req,res,next)=>
{
employeefunction.removeEmployee(req.params.userId)
.then(d=>res.json(d))
.catch(next);
})
 
router.put('/admin',(req,res,next)=>
{
    

})
module.exports=router;
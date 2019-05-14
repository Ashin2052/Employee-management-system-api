const Router=require('express').Router;
const employeeContact=require('./controller/controller.employeeContact');
  const employeeLeaveContact=require('./controller/controller.employeeLeave')
let router=Router();


router.get('/',(req,res)=>{
    res.json("ashin ahha haha");
})

router.use('/employeeContact',employeeContact);
router.use('/employeeLeaveContact',employeeLeaveContact)
module.exports=router;
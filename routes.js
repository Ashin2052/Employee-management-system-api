const Router=require('express').Router;
const employeeContact=require('./controller/controller.employee-Contact');
  const employeeLeaveContact=require('./controller/controller.Leave')
let router=Router();


router.get('/',(req,res)=>{
    res.json("Employee contact details");
})

router.use('/employees',employeeContact);
router.use('/leaves',employeeLeaveContact)
module.exports=router;
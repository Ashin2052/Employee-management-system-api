const Router=require('express').Router;
const employeeContact=require('./controller/controller.employeeContact');
  
let router=Router();


router.get('/',(req,res)=>{
    res.json("ashin ahha haha");
})

router.use('/employeeContact',employeeContact);

module.exports=router;
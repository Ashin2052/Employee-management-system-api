const Router = require("express").Router;
const router = Router();

const employeeLeavefunction = require("../functions/controller.employeeLeaveFunction");
const validateUser = require("../services/userValidation");


//Applyleave
router.post("/ApplyLeave", validateUser, (req, res, next) => {
  console.log("hjhjhjh", req.UserId, req.name, req.email);
  employeeLeavefunction
    .ApplyLeave(req.body, req.UserId, req.name, req.email)
    .then(d => res.json(d))
    .catch(next);
});

//findEmployeeAllLeave
router.get("/AppliedEmployeeList",validateUser, (req, res, next) => {
 
  
  employeeLeavefunction
    .findEmployeeAllLeave(req.isadmin)
    .then(d => res.json(d))
    .catch(next);
  
});

//MakeAdmin

router.put("/Makeadmin", validateUser, (req, res, next) => {
  console.log(req.isadmin, "you area a admin");
    employeeLeavefunction
      .MakeAdmin(req.body,req.isadmin)
      .then(d => res.json(d))
      .catch(next);
  
});

  //Approve ;leave

router.put("/Approve/", validateUser, (req, res, next) => {
 
    employeeLeavefunction
      .ApproveLeave( req.body,req.isadmin)
      .then(d => res.json(d))
      .catch(e => {
        console.log(e, "update approve leave");
      });
  
});


//employeeApply

router.get("/employeeApply/:eid", validateUser, (req, res, next) => {
  
    console.log("req.params eid", req.params.eid,req.isadmin);
    employeeLeavefunction
      .employeeApply(req.params.eid,req.isadmin)
      .then(d => res.json(d))
      .catch(next);
  
});

module.exports = router;

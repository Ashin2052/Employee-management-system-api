const Router = require("express").Router;
const router = Router();
const employee_leave_function = require("../functions/leave-Function");
const validateUser = require("../services/userValidation");
const httpResponse=require("../errorhandling/errorhandler")

//Applyleave
router.post("/", validateUser, (req, res, next) => {
  console.log("token user id name and email", req.UserId, req.name, req.email);
  employee_leave_function
    .applyLeave(req.body, req.UserId, req.name, req.email)
    .then(d =>httpResponse.errorHandler(res, d))
    .catch(e=>httpResponse.errorHandler(res, e));
});

//findEmployeeAllLeave
router.get("/",validateUser, (req, res, next) => {
  employee_leave_function
    .empLeaveList(req.isadmin)
    .then(d =>httpResponse.success(res, d))
    .catch(e=>httpResponse.errorHandler(res, e));
  });


//employeeApply
router.get("/:eid", validateUser, (req, res, next) => {
  console.log("req.params eid", req.params.eid,req.isadmin);
  employee_leave_function
   .paticularEmployeeLeaveList(req.params.eid,req.isadmin)
   .then(d =>httpResponse.success(res, d))
   .catch(e=>httpResponse.errorHandler(res, e));
});

//MakeAdmin
router.put("/make-admin", validateUser, (req, res, next) => {
  console.log(req.isadmin, "isadmin from token");
  employee_leave_function
      .makeAdmin(req.body,req.isadmin)
      .then(d =>httpResponse.success(res, d))
      .catch(e=>httpResponse.errorHandler(res, e));
});

  //Approve ;leave
router.put("/approve", validateUser, (req, res, next) => {
  employee_leave_function
      .approveLeave( req.body,req.isadmin)
      .then(d =>httpResponse.success(res, d))
      .catch(e=>httpResponse.errorHandler(res, e));
      });
  



module.exports = router;

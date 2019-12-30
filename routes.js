const Router = require("express").Router;
const employeeContact = require("./controller/controller.employee-Contact");
const employeeLeaveContact = require("./controller/controller.Leave");
let router = Router();

router.get('/test', (req, res) => {
    res.json({
        message: "welcome to Employee mnanagement system"
    })
})

router.use("/employees", employeeContact);
router.use("/leaves", employeeLeaveContact);
module.exports = router;

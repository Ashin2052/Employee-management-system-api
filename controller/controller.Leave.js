const Router = require("express").Router;
const router = Router();
const employee_leave_function = require("../services/leave-services");
const validateUser = require("../Utilities/userValidation");
const httpResponse = require("../errorhandling/errorhandler");

//Applyleave
router.post("/", validateUser, (req, res, next) => {
  console.log(
    "token user id name and email",
    req.body.Description,
    req.UserId,
    req.name,
    req.email
  );
  employee_leave_function
    .applyLeave(req.body, req.UserId, req.name, req.email)
    .then(d => httpResponse.success(res, d))
    .catch(e => httpResponse.errorHandler(res, e));
});

//findEmployeeAllLeave
router.get("/", validateUser, (req, res, next) => {
  employee_leave_function
    .empLeaveList(req.isadmin)
    .then(d => httpResponse.success(res, d))
    .catch(e => httpResponse.errorHandler(res, e));
});

//employeeApply
router.get("/:eid", validateUser, (req, res, next) => {
  console.log("req.params eid", req.params.eid, req.isadmin);
  employee_leave_function
    .paticularEmployeeLeaveList(req.params.eid, req.isadmin)
    .then(d => httpResponse.success(res, d))
    .catch(e => httpResponse.errorHandler(res, e));
});

//MakeAdmin
router.put("/make-admin/", validateUser, (req, res, next) => {
  console.log(req.body, req.isadmin, "isadmin from token");
  employee_leave_function
    .makeAdmin(req.body, req.isadmin)
    .then(d => {
      httpResponse.success(res, d);

      console.log(d, "rrdpomdr");
    })
    .catch(e => {
      httpResponse.errorHandler(res, e);
      console.log(e, "error");
    });
});

//Approve ;leave
router.put("/approve", validateUser, (req, res, next) => {
  employee_leave_function
    .approveLeave(req.body, req.isadmin)
    .then(d => httpResponse.success(res, d))
    .catch(e => httpResponse.errorHandler(res, e));
});

module.exports = router;

/**@swagger
 *  definitions:
 *    Leave:
 *      type: object
 *      properties:
 *        LeaveDate:
 *          type: string
 *        ReturnDate:
 *          type: string
 *        Description:
 *           type: string
 *      required:
 *        - LeaveDate
 *        - ReturnDate
 *        - Description
 */

/**@swagger
 *  definitions:
 *    make-admin:
 *      type: object
 *      properties:
 *        userId:
 *          type: string
 *        isadmin:
 *          type: string
 *      required:
 *        - isadmin
 *        - userId
 */
/**@swagger
 *  definitions:
 *    approve:
 *      type: object
 *      properties:
 *        Id:
 *          type: string
 *        Approved:
 *          type: string
 *      required:
 *        - Approved
 *        - Id
 */

/**@swagger
 * /leaves:
 *   post:
 *     summary: aplly leave
 *     description: Aplly leave by the employee
 *     tags:
 *        - Leaves_Controller
 *     prodeuces:
 *        - application/json
 *     parameters:
 *       - in: header
 *         name: authorization
 *       - in: body
 *         name: body
 *         schema:
 *           $ref: '#/definitions/Leave'
 *     responses:
 *            200:
 *               description:
 */

/**@swagger
 * /leaves:
 *   get:
 *     summary: aplly leave
 *     description: Aplly leave by the employee
 *     tags:
 *        - Leaves_Controller
 *     prodeuces:
 *        - application/json
 *     parameters:
 *       - in: header
 *         name: authorization
 *     responses:
 *            200:
 *               description:
 */

/**@swagger
 * /leaves/{id}:
 *   get:
 *     summary: aplly leave
 *     description: Aplly leave by the employee
 *     tags:
 *        - Leaves_Controller
 *     prodeuces:
 *        - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: USer_Id
 *         required: true
 *       - in: header
 *         name: authorization
 *     responses:
 *            200:
 *               description:
 */

/**@swagger
 * /leaves/make-admin:
 *   put:
 *     summary: aplly leave
 *     description: Aplly leave by the employee
 *     tags:
 *        - Leaves_Controller
 *     prodeuces:
 *        - application/json
 *     parameters:
 *       - in: header
 *         name: authorization
 *       - in: body
 *         name: body
 *         schema:
 *           $ref: '#/definitions/make-admin'
 *     responses:
 *            200:
 *               description:
 */
/**@swagger
 * /leaves/approve:
 *   put:
 *     summary: aplly leave
 *     description: Aplly leave by the employee
 *     tags:
 *        - Leaves_Controller
 *     prodeuces:
 *        - application/json
 *     parameters:
 *       - in: header
 *         name: authorization
 *       - in: body
 *         name: body
 *         schema:
 *           $ref: '#/definitions/approve'
 *     responses:
 *            200:
 *               description:
 */

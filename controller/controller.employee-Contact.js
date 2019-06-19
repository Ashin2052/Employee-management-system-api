const Router = require("express").Router;
const router = Router();
const employee_function = require("../services/employee-services");
const validateUser = require("../Utilities/userValidation");
const schemavalidator = require("../Utilities/schemavalidator");
const httpResponse = require("../errorhandling/errorhandler");

//register employee
router.post("/", validateUser, schemavalidator, (req, res, next) => {
  employee_function
    .signUp(req.body, req.isadmin)
    .then(d => httpResponse.success(res, d))
    .catch(e => httpResponse.errorHandler(res, e));
});

//login
router.post("/login", (req, res, next) => {
  console.log(req.body, "login ");
  employee_function
    .login(req.body)
    .then(d => httpResponse.success(res, d))
    .catch(e => {
      console.log(e, "e");
      res.status(200).json({ message: e.message });
      // httpResponse.errorHandler(res, e);
    });
});

//get approve details

router.get("/approved/:id", validateUser, (req, res, next) => {
  console.log(req.params.id, req.UserId, "user id and parameter id");

  employee_function
    .getApproveDetails(req.params.id, req.UserId)
    .then(d => httpResponse.success(res, d))
    .catch(e => httpResponse.errorHandler(res, e));
});

//get all employee

router.get("/", validateUser, (req, res, next) => {
  employee_function
    .getAllEmployee(req.isadmin)
    .then(d => httpResponse.success(res, d))
    .catch(e => httpResponse.errorHandler(res, e));
});

//find particular employee

router.get("/:id", validateUser, (req, res, next) => {
  employee_function
    .getParticularEmployee(req.params.id, req.isadmin)
    .then(d => httpResponse.success(res, d))
    .catch(e => httpResponse.errorHandler(res, e));
});

router.put("/:id", validateUser, schemavalidator, (req, res, next) => {
  employee_function
    .update(req.params.id, req.isadmin, req.UserId, req.body)
    .then(d => httpResponse.success(res, d))
    .catch(e => httpResponse.errorHandler(res, e));
});

//reset password

router.put(
  "/reset/password",
  validateUser,
  schemavalidator,
  (req, res, next) => {
    employee_function
      .resetPassword(req.UserId, req.body)
      .then(d => httpResponse.success(res, d))
      .catch(e => httpResponse.errorHandler(res, e));
  }
);

//remove employee

router.delete("/:id", validateUser, (req, res, next) => {
  employee_function
    .removeEmployee(req.params.id, req.isadmin)
    .then(d => httpResponse.success(res, d))
    .catch(e => httpResponse.errorHandler(res, e));
});

module.exports = router;

/**@swagger
 *  definitions:
 *   login:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

/**@swagger
 *  definitions:
 *    reg:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        fullName:
 *          type: string
 *        mobile:
 *          type: string
 *        gender:
 *          type: string
 *        DoB:
 *          type: string
 *        contact:
 *          type: string
 *        address:
 *          type: string
 *        isadmin:
 *          type: string
 *        isemployee:
 *          type: string
 *      required:
 *        - email
 *        - password
 */

/**@swagger
 *  definitions:
 *    reset-password:
 *      type: object
 *      properties:
 *        currentpassword:
 *          type: string
 *        newPassword:
 *          type: string
 *      required:
 *        - email
 *        - password
 */

/**@swagger
 * /employees/login:
 *   post:
 *     summary: Login
 *     description: Login by email and password
 *     tags:
 *        - Employee_Controller
 *     produces:
 *        - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Add vechile
 *         schema:
 *           $ref: '#/definitions/login'
 *     responses:
 *            200:
 *               description:
 */

/**@swagger
 * /employees:
 *    post:
 *      summary: Register new employees
 *      description: Registering new employees,Can only be done by admin
 *      tags:
 *        - Employee_Controller
 *      parameters:
 *       - in: header
 *         name: authorization
 *       - in: body
 *         name: body
 *         description: Add vechile
 *         schema:
 *           $ref: '#/definitions/reg'
 *      responses:
 *            200:
 *               description:
 */

/**@swagger
 * /employees/:
 *    get:
 *      summary: Get all employees
 *      description: Geth the list of all employees
 *      tags:
 *         - Employee_Controller
 *      parameters:
 *       - in: header
 *         name: authorization
 *      responses:
 *        200:
 *          description: Successful operation
 */

/**@swagger
 * /employees/{id}:
 *    get:
 *      summary: Get particular employees
 *      description: get particular employees by id
 *      tags:
 *        - Employee_Controller
 *      parameters:
 *        - name: id
 *          in: path
 *          description: User ID
 *          required: true
 *          schema:
 *            type: string
 *        - in: header
 *          name: authorization
 *      responses:
 *        200:
 *          description: Successful operation
 */
/**@swagger
 * /employees/{id}:
 *    put:
 *      summary: Update particular employees
 *      description: Update particular employeees by finding the employee through its id.
 *      tags:
 *        - Employee_Controller
 *      parameters:
 *        - name: id
 *          in: path
 *          description: USer_Id
 *          required: true
 *          schema:
 *            type: string
 *        - in: header
 *          name: authorization
 *        - in: body
 *          name: body
 *          description: Add vechile
 *          schema:
 *            $ref: '#/definitions/reg'
 *      responses:
 *        201:
 *          description: registered
 */

/**@swagger
 * /employees/{id}:
 *    delete:
 *      summary: Delete employee info and its leave details
 *      description: Both the emoloyee and its all the leave details are removed .
 *      tags:
 *        - Employee_Controller
 *      parameters:
 *        - name: id
 *          in: path
 *          description: USer_Id
 *          required: true
 *          schema:
 *            type: string
 *        - in: header
 *          name: authorization
 *      responses:
 *        201:
 *          description: deleted
 */

/**@swagger
 * /employees/reset/Password/:
 *    put:
 *      summary: Reset password
 *      description: Reseting password .Requires old password to update a new one.
 *      tags:
 *        - Employee_Controller
 *      parameters:
 *        - name: id
 *          in: path
 *          description: USer_Id
 *          required: true
 *          schema:
 *            type: string
 *        - in: header
 *          name: authorization
 *        - in: body
 *          name: body
 *          description: Add vechile
 *          schema:
 *            $ref: '#/definitions/reset-password'
 *      responses:
 *        201:
 *          description: registered
 */

const Joi = require("@hapi/joi");

function schemaValidator(req, res, next) {
  const schema = Joi.object().keys({
    username: Joi.string().regex(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
    // password: Joi.string().regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/ ||
    //     /^[a-zA-Z0-9]*$/
    // ),
    access_token: [Joi.string(), Joi.number()],

    birthyear: Joi.number()
      .integer()
      .min(1900)
      .max(2013),
    // email: Joi.string().email({ minDomainSegments: 2 })
    email: Joi.string().regex(
      /^[a-zA-Z0-9.!#$%&amp;’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)+/
    ),

    // contact: Joi.string()
    //   .regex(/^[0-9\-\+]{7,15}$/)
    //   .min(7)
    //   .max(10),
    gender: Joi.string().regex(/^male$|^female$|^others/),
    address: Joi.string().regex(/^[-.?!,;:() A-Za-z0-9]*$/),
    // isadmin: Joi.string().regex(/^true$|^false$/),
    // isemployee: Joi.string().regex(/^true$|^false$/)
  });

  // Return result.
  // const result = Joi.validate({ username: req.fullName }, schema);
  // result.error === null -> valid
  console.log(req.body.fullName, "fullname");
  // You can also pass a callback which will be called synchronously with the validation result.
  Joi.validate(
    {
      username: req.body.fullName,
      // password: req.body.password,
      email: req.body.email,
      // contact: req.body.contact,
      gender: req.body.gender,
      address: req.body.address,
      // isadmin: req.body.isadmin,
      // isemployee: req.body.isemployee
    },
    schema,
    function(err, value) {
      if (err) {
        console.log("error");
        res.send(err);
      } else {
        next();

        console.log(value);
      }
    }
  ); // err === null -> valid
}

module.exports = schemaValidator;

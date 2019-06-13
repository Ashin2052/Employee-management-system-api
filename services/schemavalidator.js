const Joi=require('@hapi/joi')

function schemaValidator( req , res ,next ){
    console.log( req.body,'validaor')
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(30),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        access_token: [Joi.string(), Joi.number()],
        birthyear: Joi.number().integer().min(1900).max(2013),
        email: Joi.string().email({ minDomainSegments: 2 }),
        mobile:Joi.string().regex(/^[0-9\-\+]{9,15}$/).min(10).max(10),
        gender:Joi.string().regex(/^male$|^female$/),
        address:Joi.string().alphanum().min(10).max(100),
        isadmin:Joi.string().regex(/^true$|^false$/),
        isemployee:Joi.string().regex(/^true$|^false$/),
    });
     
    // Return result.
    // const result = Joi.validate({ username: req.fullName }, schema);
    // result.error === null -> valid
     console.log(req.body.fullName,"fullname")
    // You can also pass a callback which will be called synchronously with the validation result.
    Joi.validate({ username: req.body.fullName,
        password:req.body.password,
        email:req.body.email,
        mobile:req.body.mobile,
        gender:req.body.gender,
        address:req.body.address,
        isadmin:req.body.isadmin,
        isemployee:req.body.isemployee,}, schema, function (err, value) { 

        if(err){
            res.send(err);
        }
        else{
            next();
            
            console.log(value);
        }
    });  // err === null -> valid
     
   
  }

  module.exports = schemaValidator;
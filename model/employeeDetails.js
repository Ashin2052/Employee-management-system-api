const mongoose=require('mongoose');

var employeeSchema=new mongoose.Schema({
    fullName:
    {
        type:String
    },

    password:{
        type:String
    },

    email:
    {
        type:String
    },
    mobile:
    {
     type:String
    },
    address:
    {
        type:String
    },
    gender:
    {
    type:String  
    },
    age:
    {
        type:Number
    }

});

const employeeContact = mongoose.model('employeeContact',employeeSchema);
module.exports = employeeContact;
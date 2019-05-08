const mongoose=require('mongoose');

var employeeSchema=new mongoose.Schema({
    fullName:
    [{type:mongoose.Schema.ObjectId,
        ref: 'employeeContact'}],

    LeaveDate:{
        type:Date
    },

    ReturDate:
    {
        type:Date
    },
    Approved:
    {
     type:Boolean
    }
   

});

const employeeContact = mongoose.model('employeeLeave',employeeSchema);
module.exports = employeeContact;
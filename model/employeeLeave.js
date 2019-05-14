 const mongoose=require('mongoose');

const emp=require('./employeeDetails');

var employeeSchema=new mongoose.Schema({
    eid:
    [{type:mongoose.Schema.ObjectId,
        ref: 'employeeContact'}],

    LeaveDate:{
        type:Date,
        required:true
    },

    ReturnDate:
    {
        type:Date,
        required:true
    }, 
    Approved:
    {
     type:Boolean,
     default:false
    },
   Description:
   {
     type:String
   }
   

});

emp
  .find()
  .populate('eid')
  .exec(function(err, xx) {
    if(err) console.log(err);
    //this will log all of the users with each of their posts 
    else console.log("populated");
  }) 
const employeeLeave = mongoose.model('employeeLeave',employeeSchema);
module.exports = employeeLeave;
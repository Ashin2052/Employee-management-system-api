const mongoose=require('mongoose');

var AdminInfo=new mongoose.Schema({
    name:
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
    contact:
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

const AdminInfo = mongoose.model('AdminInfo',AdminInfo);
module.exports = AdminInfo;
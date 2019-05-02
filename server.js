const express = require('express');
const mongoose = require('mongoose');
const bodyparsers=require('body-parser');
const routeManager=require('./routes');

const app = express();


require("dotenv").config({path:"variables.env"});

mongoose.connect(process.env.URL,{useNewUrlParser:true});
mongoose.connection.on('connected',()=>console.log('mongodb connected successfully.'));
mongoose.connection.on('error',(error)=>console.log('connection failed.'))


app.use(bodyparsers.urlencoded({
    extended:true
}));

app.use(bodyparsers.json({}));
app.use('/',routeManager);



app.listen(process.env.PORT,()=>console.log('server started'));
//var firebase = require("../config");
var express=require("express");
var getInfo=require("../models/notebook");
// var cookieParser = require('cookie-parser');
var app=express();
// app.use(cookieParser());
var route=express.Router();
route.post("/",function(request,response)
{
  getInfo.getNotes(request.decoded._id,function(err,msg)
   {
     if(err)
       response.send({status:false,msg:err});
      else
         response.send({status:true,msg:msg});
   });
})
module.exports = route;

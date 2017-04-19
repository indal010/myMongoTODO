var cookieParser = require('cookie-parser');
var getInfo=require("../models");
var express=require("express");
var app=express();
app.use(cookieParser());
var route=express.Router();
route.post("/",function(request,response)
  {
  getInfo.userInfo(request.decoded._id,function(err,msg)
   {
     if(err)
       response.send({status:false,msg:err});
      else
         response.send({status:true,msg:msg});
   });
    });
module.exports = route;

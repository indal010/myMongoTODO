var login=require("../models");
var express=require("express");
var route=express.Router();
route.post("/",function(request,response)
  {
    login.checkLogin(request.body,function(err,msg)
   {
     var status=true;
      if(msg=="password did not match"||msg=="not authenticated")
         status=false;
     if(err)
       response.send({status:false,msg:err});
      else
         response.send({status:status,msg:msg});
   });
    });
module.exports = route;

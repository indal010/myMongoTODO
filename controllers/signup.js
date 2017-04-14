var User=require("../models");
var express=require("express");
var route=express.Router();


route.post("/",function(request,response)
{
User.register(request.body,function(err,docs)
    {
      if(err)
          response.send({status:false,msg:err});
        else
         response.send({status:true,msg:"successfully registered"});
      })
})
module.exports=route;

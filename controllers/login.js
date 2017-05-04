var express=require("express");
var jwt    = require('jsonwebtoken');
var login=require("../models");
var app=express();
var config=require("../config");
var validation=require("../config/validation");
var route=express.Router();
 app.set('superSecret', config.secret);
 route.post("/",function(request,response)
  {
    var result={};
    result.status=false;
 try{
    request.check(validation.validationSchema.login);
    request.getValidationResult().then(function(isValid)
    {
    try {
    if(!isValid.isEmpty())
    {
      //console.log("error");
      var errors=request.validationErrors();
      throw errors[0].msg;
    }
    var token;
    request.body.password=login.encrypt(request.body.password);
  login.checkLogin(request.body,function(err,msg)
   {
     if(err)
       {
         response.send({status:false,msg:err});
       }
       else
        {
          console.log(msg);
          token = jwt.sign({_id:msg._id}, app.get('superSecret'), {
                expiresIn: 24*60*60*1000 // expires in 24 hours
                      });
                response.cookie("key",token);
                response.send({status:true,msg:"login successful"});
       }

   });
  }
  catch(err)
     {
      result.message="some problem occured bcoz of issue in server";
       if(!validation.validationSchema.checkSystemErrors(err))
       {
         result.status=false;
         result.message=err;
       }
       response.send(result);
       return;
      }
  })
}
  catch(e)
   {
     console.log(e);
    }
    });
module.exports = route;

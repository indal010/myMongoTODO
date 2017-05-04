var User=require("../models");
var validation=require("../config/validation");
var express=require("express");
var route=express.Router();


route.post("/",function(request,response)
{

  console.log("this is signup page");
  var result={};
  result.status=false;
try{
  request.check(validation.validationSchema.signup);
  request.getValidationResult().then(function(foundInvalid)
  {
    console.log(foundInvalid);
  try {
  if(!foundInvalid.isEmpty())
  {
    console.log("error");
    var errors=request.validationErrors();
    throw errors[0].msg;
  }
  request.body.password=User.encrypt(request.body.password);
User.register(request.body,function(err,docs)
    {
      if(!docs)
          response.send({status:false,msg:err});
        else
         response.send({status:true,msg:"successfully registered"});
      })
}
catch(err)
   {
         result.message="some problem occured bcoz of issue in server";
          if(!validation.validationSchema.checkSystemErrors(err))
          {
            console.log("rr");
            result.status=false;
            result.message=err;
          }
          response.send(result);
          return;
   }
   });
 }
 catch(err)
 {
   console.log("found err");
 }
})
module.exports=route;

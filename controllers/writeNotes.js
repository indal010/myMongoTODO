var User=require("../models/notebook");
var express = require("express");
var route = express.Router();

// module.exports=route;
route.post("/",function(request,response)
{
    request.body.id=request.decoded._id;
    User.saveNote(request.body,function(err,docs)
    {
      if(!docs)
          response.send({status:false,msg:err});
        else
         response.send({status:true,msg:"successfully registered"});
      })
 })
module.exports=route;

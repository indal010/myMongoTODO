//var firebase = require("../config");
var express=require("express");

var cookieParser = require('cookie-parser');
var app=express();
app.use(cookieParser());
var route=express.Router();
route.post("/",function(request,response)
{
  //console.log(request.headers.cookie);
    if(request.headers.cookie===undefined)
     response.send({"status":false});
     else
     {
        response.send({status:true});
     }
})
module.exports = route;

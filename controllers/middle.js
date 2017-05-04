var express     = require('express');
var app         = express();//bucket
var apiRoutes = express.Router();//Small part of bucket
var jwt    = require('jsonwebtoken');
var config=require("../config");
app.set('superSecret', config.secret); // secret variable

apiRoutes.use(function(req, res, next) {

  var token =req.headers['x-access-token'] ||req.headers.cookie;
     if(token)
     {
       token=token.substr(4);
       jwt.verify(token, app.get('superSecret'), function(err, decoded) {
         if (err) {
           return res.json({ success: false, message: err });
             }
         else {
           req.decoded = decoded;
           next();
         }
       });
     }
     else {
           return res.status(403).send({
           success: false,
           message: 'No token provided..., you need to login first'
       });
     }
   });

module.exports=apiRoutes;

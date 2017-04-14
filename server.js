var express=require("express");

//var session = require('express-session');
var connection = require('./config');
var app=express();
// app.use(express.static("./public"));

var cors=require("cors");
app.use(cors());
var bodyParser=require("body-parser");
 var port = process.env.PORT || 8086;
     app.use(bodyParser.urlencoded({
          extended: true
          }));
          app.use(bodyParser.json());
     app.use(require('./controllers'));

var server=app.listen(port, function () {
    port1=server.address().port;
    connection();
  console.log('server has started at http://127.0.0.1:'+port1);
});

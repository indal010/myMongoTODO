var express=require("express");
var validator=require("express-validator");
var morgan      = require('morgan');
var cors=require("cors");
var connection = require('./config');
var app=express();
var bodyParser=require("body-parser");
var port = process.env.PORT || 8086;


// app.use(express.static("./public"));
app.use(morgan('dev'));
app.use(cors());
app.use(validator());
     app.use(bodyParser.urlencoded({
          extended: true
          }));
          app.use(bodyParser.json());
     app.use(require('./controllers'));

var server=app.listen(port, function () {
    port1=server.address().port;
    connection.connect();
  console.log('server has started at http://127.0.0.1:'+port1);
});

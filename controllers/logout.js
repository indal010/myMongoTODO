// var cookieParser = require('cookie-parser');
var express = require("express");
var route = express.Router();
route.post("/", function(request, response) {
    response.clearCookie("key");
    response.send("logout successfully, please login to go to home page");
});
module.exports = route;

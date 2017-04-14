var express=require("express");
var route=express.Router();

route.use("/signup",require("./signup"));
route.use("/login",require("./login"));
// route.use("/getall",require("./getall"));
// route.use("/logout",require("./logout"));
// route.use("/checkpage",require("./checkpage"));
  module.exports = route;

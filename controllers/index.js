var express = require("express");
var route = express.Router();

route.use("/signup", require("./signup"));
route.use("/login", require("./login"));
route.use("/getProfile", require("./middle"), require("./getProfile"));
route.use("/logout", require("./logout"));
// route.use("/checkpage",require("./checkpage"));
module.exports = route;

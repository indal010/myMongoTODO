var express = require("express");
var route = express.Router();
var auth =require("./middle");

route.use("/signup", require("./signup"));
route.use("/checkpage",auth, require("./checkpage"));
route.use("/checkNotes",auth, require("./checkNotes"));
route.use("/logout", require("./logout"));
route.use("/login", require("./login"));
route.use("/getProfile", auth, require("./getProfile"));
//route.use("/logout", require("./logout"));
route.use("/writeNotes",auth,require("./writeNotes"));
module.exports = route;

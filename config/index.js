var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/myDatabase");
var Schema=mongoose.Schema;

module.exports=function(){
var db=mongoose.connection;

db.on('error',function(err){
  console.log("connection error: ",err);
})
// db.once('open',function()
// {
//   console.log("connection to DB successful");
// })
}
module.exports=Schema;

var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/myDatabase");

module.exports={
    'secret': 'ilovescotchyscotch',
    "algorithm" : 'aes-256-ctr',
        "key" : 'd6F3Efeq',
  "connect":function(){
  var db=mongoose.connection;

db.on('error',function(err){
  console.log("connection error: ",err);
})
// db.once('open',function()
// {
//   console.log("connection to DB successful");
// })
}
}

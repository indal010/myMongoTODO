var Schema=require("../config");
var mongoose=require("mongoose");
var crypto = require('crypto');
validators = require('mongoose-validators');
var Schema = mongoose.Schema;
algorithm = 'aes-256-ctr';
    key = 'd6F3Efeq';
var userSchema=new Schema({
  name: { type: String, required: true,unique:true,validate:validators.isAlpha()},
  email: {type:String,required:true,validate:validators.isEmail()},
  password:{type:String,required: true},
  created_at: Date,
  updated_at: Date
                  });
     userSchema.statics.register = function(signupdata,callback)
     {
        var password=encrypt(signupdata.password);
        var userData={
              name:signupdata.name,
              email:signupdata.email,
               password:password
              };
      var testdata = new  User(userData);
      try
         {
            testdata.save(function(err, data){
              if(err)
              {
                callback(err,null);
                return;
              }
                else
                 {
                   callback(null,"success");
                   console.log ('Success:' , data);
                 }

              });
               return true;
    }
    catch(err)
        {  console.log(err);
           }
          return false;
    }
    userSchema.pre('save', function (next) {
        var currentDate = new Date();
        this.updated_at = currentDate;
        if (!this.created_at)
        this.created_at = currentDate;
       next();
    }) ;

      userSchema.statics.checkLogin=function(loginData,callback)
        {
         User.findOne({email:loginData.email},function(err, docs){
                if (err)
                  callback(err,null);
                 else
                {
                  if(docs)
                  {
                   var encryptUserPassword=encrypt(loginData.password);
                    if(encryptUserPassword==docs.password)
                      {
                        callback(null,"login success");
                    }
                      else
                        callback(null,"password did not match");

                   }
                  else
                  callback(null,"not authenticated");
                }
         });
       }

    function encrypt(text){
      var cipher = crypto.createCipher(algorithm,key);
      var crypted = cipher.update(text,'utf8','hex')
      crypted += cipher.final('hex');
      return crypted;
    }







var User=mongoose.model("User",userSchema);
module.exports=User;

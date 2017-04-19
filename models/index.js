var config=require("../config");
var express=require("express");
var crypto=require("crypto");
var app=express();
var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var jwt    = require('jsonwebtoken');
validators = require('mongoose-validators');
    app.set('superSecret', config.secret);

var userSchema=Schema({
  name: { type: String, required: true,validate:validators.isAlpha()},
  email: {type:String,required:true,unique:true,validate:validators.isEmail()},
  password:{type:String,required: true},
  created_at: Date,
  updated_at: Date
                  });
     userSchema.statics.register = function(signupdata,callback)
     {
       var token;

      var testdata = new  User(signupdata);
      try
         {
            testdata.save(callback);
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
         User.findOne({email:loginData.email,password:loginData.password},callback);
       }

       userSchema.statics.userInfo=function(_id,callback)
        {
            User.findById(_id,callback);
       }


  userSchema.statics.encrypt=  function(text){
      var cipher = crypto.createCipher(config.algorithm,config.key);
      var crypted = cipher.update(text,'utf8','hex')
      crypted += cipher.final('hex');
      return crypted;
    }

var User=mongoose.model("User",userSchema);
module.exports=User;

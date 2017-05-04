var config=require("../config/index1");
var express=require("express");
//var crypto=require("crypto");
var app=express();
var mongoose=require("mongoose");
var Schema=mongoose.Schema;
//var jwt    = require('jsonwebtoken');
//validators = require('mongoose-validators');
  //  app.set('superSecret', config.secret);

var userSchema1=Schema({
   title: { type: String},
   content: {type:String},
   id:{type:String,required: true},
   sequence:Number,
   created_at: Date,
   updated_at: Date
                  });


    userSchema.statics.saveNote = function(signupdata,callback)
      {

           var testdata = new  User(signupdata);
             try
              {
                 testdata.save(callback);
                    }
              catch(err)
             {
               console.log(err);
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
        var User=mongoose.model("User",userSchema1);
          module.exports=User;

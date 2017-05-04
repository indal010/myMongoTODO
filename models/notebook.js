var config = require("../config");
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema1 = Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    id: {
        type: String,
        required: true
    },
    //  sequence:Number,
    created_at: Date,
    updated_at: Date
});

userSchema1.statics.saveNote = function(signupdata, callback) {
//this
    var testdata = new User1(signupdata);
    try {
        testdata.save(callback);
    } catch (err) {
        console.log(err);
    }
}
userSchema1.pre('save', function(next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});

userSchema1.statics.getNotes = function(id, callback) {
    console.log(id);
    User1.find({
        id: id
    }, callback);
}

var User1 = mongoose.model("Note", userSchema1);
module.exports = User1;

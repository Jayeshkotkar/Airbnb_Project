// this file is used for user signup and mongoose will add username ByDefault 


const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new Schema({
    email:{
        type:String,
        require:true
    },
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);
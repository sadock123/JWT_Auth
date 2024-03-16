const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Please Enter your email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Please Enter your Password"],
    }
});

module.exports = mongoose.model("Users",userSchema);
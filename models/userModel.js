let mongoose = require("mongoose"),
    Schema = mongoose.Schema;


let userSchema = new Schema({
    username:{
        type:String,
        required:true,
        null: false
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    role:{
        type:String,
        enum:['teacher','student']
    }
});
module.exports = mongoose.model("users",userSchema);
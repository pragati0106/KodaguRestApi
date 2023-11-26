const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config();

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        match:/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    },
    password:{
        type:String,
        required:true,
    }, 
})




const User = mongoose.model('User', UserSchema)

module.exports = User



const mongoose= require("mongoose");
const dotenv=require("dotenv")
dotenv.config();

const connectToDB=async()=>{
    await mongoose.connect(process.env.mongo_url)
    .then(()=>{
        console.log("connected db")
    })
    .catch((err)=>{console.log(err)})
}
// connectToDB();
module.exports=connectToDB;


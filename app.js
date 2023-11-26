const express=require("express");
const mongoose=require("mongoose")
const userRouter = require('./router/users.js');
const taskRouter = require('./router/tasks.js');
const app=express();
const dotenv=require("dotenv")
const cors = require('cors');
app.use(cors())
dotenv.config();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use('/users', userRouter);
app.use('/tasks', taskRouter);

mongoose.connect(process.env.mongo_url)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));



/////////////////////creating a schema for task  (structure for our task)/////////////////////////////////

const taskSchema=new mongoose.Schema({
    title:{type: String,required:true},
    description:{type: String},
    assigned_user:{type: String},
    due_date:{ type: Date,required:true},
    completionStatus: {
        type: Boolean,
        default: false,
      }

    
})


////////////////////creating a schema for user (structure for our user)/////////////////////////////////

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    },
    password:{
        type:String,
        required:true,
    },
    tokens: [
        {
          // array of objects, each with a token property
          token: {
            type: String,
            required: true
          }
        }
      ]
})

// Create a Mongoose model based on your schema
const User = mongoose.model("user", UserSchema);
const Task = mongoose.model('task', taskSchema);

app.use('/users', userRouter);
app.use('/tasks', taskRouter);

   


  app.use('/', (req, res) => {
    res.json({
      message: "API is running. Please use '/users' and '/tasks' endpoints.",
    });
  });
  
  // with middleware: new request -> do something -> run route handler
  module.exports = app;
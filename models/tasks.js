const mongoose=require("mongoose")

const taskSchema=new mongoose.Schema({
    title:{type: String,required:true},
    description:{type: String},
    assigned_user:{type: String},
    due_date:{ type: Date,required:true},
    completionStatus: {
        type:Boolean,
        default: false,
      },
      completionTime: {
        type: Date,
        default: Date.now,
      },

    
}, {timestamps: true})
const Task = mongoose.model('Task', taskSchema)

module.exports = Task


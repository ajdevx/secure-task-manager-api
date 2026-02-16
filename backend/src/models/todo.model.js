import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        trim: true,
        maxlength: 300
    },
    description:{
        type:String,
        trim: true,
        maxlength: 1000
    },
    status:{
        type:String,
        enum:["pending","in-progress","completed"],
        default: "pending"
    },
    priority:{
        type:String,
        enum:["low","medium","high"],
        default:"low"
    },
    isDeleted:{
        type: Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
        index:true //enable fast searching using b tree
    }

},{timestamps: true})

export const Todo = mongoose.model("Todo",todoSchema);
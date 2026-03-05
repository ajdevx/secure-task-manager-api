import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {Todo} from "../models/todo.model.js"

const createTodo = asyncHandler(async(req, res, next) =>{
    console.log(req.user)
    const {title, description, priority} = req.body;
    console.log(req.body)
    if(!title) throw new ApiError(400, "Todo title is a necessary field");

    const todo = await Todo.create({
        title,
        description,
        priority,
        user:req.user._id
    })
    

    res.status(200)
        .json(new ApiResponse(201,"Todo creation successful"))
})

export {createTodo}
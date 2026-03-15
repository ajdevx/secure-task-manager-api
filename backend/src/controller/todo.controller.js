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

const getAllTodos = asyncHandler(async(req,res)=>{
    const userTodos = await Todo.find({
        $and:[
            {user:req.user._id},
            {isDeleted:false}
        ]
    });
    console.log(userTodos);
    res.status(200)
        .json(new ApiResponse(201,userTodos, "all todos fetching Successfull"));
})


const deleteTodo = asyncHandler(async(req,res)=>{
    const {todoId} = req.params;
    if(!todoId) throw new ApiError(400, "No todo is selected");
    const todo = await Todo.findOne({
        user:req.user._id,
        _id:todoId});
    todo.isDeleted = true;
    await todo.save();
        res.status(200)
        .json(new ApiResponse(201, "Todo moved to the trash"));

})

const updateTodo = asyncHandler(async(req,res)=>{
    const {title,description,status,priority } = req.body;
    const {todoId} = req.params;
    if(!todoId) throw new ApiError(400, "No todo is selected");
    const updateFields = {};
   if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (status) updateFields.status = status;
    if (priority) updateFields.priority = priority;;


const updatedTodo = await Todo.findOneAndUpdate(
        { _id: todoId, user: req.user._id },
        { $set: updateFields },
        { new: true }
    );
    if(!updatedTodo) throw new ApiError(400, "wrong todo id");
    


     res.status(200)
        .json(new ApiResponse(201,updatedTodo, "todos updated Successfull"));


})

export {
    createTodo,
    getAllTodos,
    deleteTodo,
    updateTodo
}
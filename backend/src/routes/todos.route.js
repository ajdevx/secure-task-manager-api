import {Router} from "express";
const router = Router();
import {verifyJwt} from "../middlewares/auth.middleware.js"
import {createTodo,getAllTodos,deleteTodo,updateTodo} from "../controller/todo.controller.js"
router.post("/create/todo",verifyJwt,createTodo)
router.get("/userTodo",verifyJwt,getAllTodos)
router.post("/delete/todo/:todoId",verifyJwt,deleteTodo)
router.post("/update/todo/:todoId",verifyJwt,updateTodo)
//     /app/v1/todos/create/todo


export default router;
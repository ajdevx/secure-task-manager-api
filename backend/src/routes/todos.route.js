import {Router} from "express";
const router = Router();
import {verifyJwt} from "../middlewares/auth.middleware.js"
import {createTodo} from "../controller/todo.controller.js"
router.post("/create/todo",verifyJwt,createTodo)
//     /app/v1/todos/create/todo


export default router;
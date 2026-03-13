import jwt from "jsonwebtoken"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"

const verifyJwt = asyncHandler(async(req,res,next)=>{
    const token =req.cookies.acessToken|| req.header("Authorization")?.replace("Bearer ","");

    if(!token) throw new ApiError(401, "Unauthorized access")
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id)
    if(!user) throw new ApiError(401, "User does not exists")
        req.user = user;
    next();
})

export {verifyJwt}
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {sendMail} from "../utils/sendMail.js"
import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const sendOtpForEmail = asyncHandler(async(req, res) =>{
    const token = req.header("Authorization")?.replace("Bearer ","");
    const decode = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

    const otp = Math.floor(Math.random()*1000000) +"";
   // await sendMail(decode.email, otp);    this will work on application

    console.log("Otp--->"+otp);

    //save otp on data base
    const user = await User.findOne({ email: decode.email });

    user.resetOtp = await bcrypt.hash(otp,7);
    user.resetOtpExpiry = Date.now() + 5*60*1000;
    await user.save();

    return res.status(201)
      .json(new ApiResponse(
        200, "Otp sent successfully")
    )

})
const verifyEmail = asyncHandler(async(req, res) =>{
        const {OTP } = req.body;
        const token = req.header("Authorization")?.replace("Bearer ","");
        const decode = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        
        const user = await User.findOne({email: decode.email});
        if(!OTP == user.resetOtp) throw new ApiError(400,"Wrong otp");
        if(user.resetOtpExpiry < Date.now()) throw new ApiError(400, "Otp expired");
        
        user.isEmailVerified = true;
        await user.save();

        res.status(200)
           .json(
           new ApiResponse (200,"Your email is verified now")
           )

})

export {verifyEmail, sendOtpForEmail}
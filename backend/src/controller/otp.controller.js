import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {generateOtp} from "../utils/generateOtp.js"
import {sendMail} from "../utils/sendMail.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const forgotPassword = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    if(!email?.trim()) throw new ApiError(400, "Please enter email address");

    const user = await User.findOne({email});
    if(!user) throw new ApiError(400, "User does not exits");


    const code = await generateOtp();
   // await sendMail(email,code);
   console.log(code);

//hashing otp 
    user.resetOtp = await bcrypt.hash(code,7);
    user.resetOtpExpiry = Date.now()+ 5*60*1000;

//sending  resetOtpToken
   const options = {
        httpOnly: true,
        secure: true
    }
    const resetOtpToken = jwt.sign({
        email: user.email,
    },process.env.RESET_OTP_SECRET,
    {expiresIn: process.env.RESET_OTP_EXPIRY_IN}
)

    await user.save({validateBeforeSave: false })

      return res.status(201)
      .cookie("resetOtpToken",resetOtpToken,options)
      .json(new ApiResponse(
        200, "Otp sent successfully")
    )

    
})

export {forgotPassword}
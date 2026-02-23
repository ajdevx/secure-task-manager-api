import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {generateOtp} from "../utils/generateOtp.js"
import {sendMail} from "../utils/sendMail.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import bcrypt from "bcrypt"

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


    await user.save({validateBeforeSave: false })

      return res.status(201)
      .json(new ApiResponse(
        200, "Otp sent successfully")
    )

    
})

//verify Otp 
const verifyOtp = asyncHandler(async(req, res)=>{
    const {email, resetOtp} = req.body;
    


    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, "User does not exist");
    }
    const isOtpValid = await bcrypt.compare(
        resetOtp.toString(),
        user.resetOtp
    );
        if (!isOtpValid) {
        throw new ApiError(400, "Invalid OTP");
    }
    if(user.resetOtpExpiry < Date.now()){
        throw new ApiError(400, "OTP expired");
    }
    return res.json(
                    new ApiResponse(201,"Otp success fully verified")
                  )
    


})

//reset password 
const resetPassword = asyncHandler(async(req, res)=>{
    const {email, resetOtp, password} = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, "User does not exist");
    }
    const isOtpValid = await bcrypt.compare(
        resetOtp.toString(),
        user.resetOtp
    );
        if (!isOtpValid) {
        throw new ApiError(400, "Invalid OTP");
    }
        if(user.resetOtpExpiry < Date.now()){
        throw new ApiError(400, "OTP expired");
    }

    const newPassword = await bcrypt.hash(password,10);
    user.password = newPassword;
    await user.save();
    return res.json(
                    new ApiResponse(201,"Password has been changed")
                  )



})


export {forgotPassword,
    verifyOtp,
    resetPassword
}
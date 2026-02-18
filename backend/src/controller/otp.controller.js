import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {generateOtp} from "../utils/generateOtp.js"
import {sendMail} from "../utils/sendMail.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const forgotPassword = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    if(!email?.trim()) throw new ApiError(400, "Please enter email address");

    const user = await User.findOne({email});
    if(!user) throw new ApiError(400, "User does not exits");

//hashing otp is also required to be done later
    const code = await generateOtp();
    await sendMail(email,code);

    user.resetOtp = code;
    user.resetOtpExpiry = Date.now()+ 5*60*1000;

    await user.save({validateBeforeSave: false })

      return res.status(201).json(new ApiResponse(
        200, "Otp sent successfully")
    )

    
})

export {forgotPassword}
import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const generateAccessAndRefreshTokens = async (userId) =>{
    try{
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});
        return {accessToken, refreshToken};
    }catch(err){
        console.log(err);
        throw new ApiError(500,"Token generation failed")
    }
}

const registerUser = asyncHandler(async (req,res) =>{

const {fullName, password, email} =  req.body;
//validating all necessay fields
if (
    !fullName?.trim() ||
    !password?.trim() ||
    !email?.trim()
) {
    throw new ApiError(400, "Need to fill all required fields");
}
// Email syntax validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
    throw new ApiError(400, "Please enter a valid email address");
}
//Password validation -> UpperCase , lowercase and a Special syntax

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
if(!passwordRegex.test(password)){
    throw new ApiError(400,"Password must be at least 6 characters long and include uppercase, lowercase, number and special character")
}

//check if user already exist
const existingUser = await User.findOne({email});
if(existingUser) throw new ApiError(400, "User already exist");
//take image path from multer middleware
const avatarLocalPath = req.file?.path;
//uploading avatar to cloudinary
const avatar = undefined
//const avatar = await uploadOnCloudinary(avatarLocalPath);

//saving user to database
const user = await User.create({
    fullName,
    email,
    password,
    avatar: avatar?.url|| "",

})
//generating tokens
const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);
 //checking that user is created or not
    const createdUser = await User.findById(user._id).select((
        "-password -refreshToken"
    ))
     if(!createdUser) throw new ApiError(500,"User registration failed");

     const options = {
        httpOnly: true,
        secure: true
    }
   

    return res.status(201)
               .cookie("accessToken", accessToken, options)
              .cookie("refreshToken", refreshToken, options)
              .json(
                new ApiResponse(201,createdUser, "User Sign in successessfull")
              )
   })





   




export{registerUser}
import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"

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
//const avatar = await uploadOnCloudinary(avatarLocalPath);








   
})



export{registerUser}
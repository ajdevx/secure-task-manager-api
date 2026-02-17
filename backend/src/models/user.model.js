import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName :{
        type: String,
        required: [true, "fullName is required"],
        trim: true //to remove leading spaces
    },
    password:{ 
        type: String,
        required: [true, "password is required"],
        minlength : 6,
        select: false //prevent them from being returned accidentally
    },
    email: {
        type: String,//minlength and maxlength does not work for  a number
        unique: true,
        required: [true, "email is required"],
        match :[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Please enter a valid email"]
    },
    isPhoneNumberVerified:{
        type: Boolean,
        default: false
    },
    refreshToken:{
        type: String,
        select: false //prevent them from being returned accidentally
    },
    resetOtp:{
        type: String
    },
    resetOtpExpiry:{
        type: Date
    },
    avatar:{
        type:String
    }
},{timestamps:true})

export const User = mongoose.model("User",userSchema);



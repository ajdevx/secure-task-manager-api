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
    phoneNumber: {
        type: String,//minlength and maxlength does not work for  a number
        unique: true,
        required: [true, "phoneNumber is required"],
        match: [/^[0-9]{10}$/,"phoneNumber should be exactly 10 digits"] // regex expression to check length at data base level
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

export const User = mongoose.model("User",userSchema)

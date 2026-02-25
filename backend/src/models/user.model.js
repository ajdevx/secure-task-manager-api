import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

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
    isEmailVerified:{
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



userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)

}

userSchema.methods.generateAccessToken =  function(){
    return  jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY_IN + "s"}
    )

}

userSchema.methods.generateRefreshToken =  function(){
    console.log(process.env.REFRESH_TOKEN_SECRET);
    console.log(process.env.REFRESH_TOKEN_EXPIRY_IN);
    return  jwt.sign(
        {_id: this._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY_IN}
    )
}
export const User = mongoose.model("User",userSchema);


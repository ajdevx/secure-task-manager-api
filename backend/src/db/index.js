import mongoose from "mongoose"
import {DB_NAME} from "../constant.js"

const connectDB = async() =>{
    try{
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

    }catch(error){
        console.log("There is an error in mongodb string for db connection")
        process.exit(1);
    }
}
export {connectDB}
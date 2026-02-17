import dotenv from "dotenv/config"
import {app} from "./app.js"
import {connectDB} from "./db/index.js"

connectDB()
.then(()=>{
    app.on("error",()=>{
        console.log("error comming in talking db with node application")
    })
    app.listen(4000,()=>{
        console.log("server started");
    })
}).catch((error)=>{
    console.log(error,"there is an error connectin to db")
    process.exit(1)
})


import dotenv from "dotenv/config"
import {app} from "./app.js"
import {connectDB} from "./db/index.js"

connectDB()
.then(()=>{
    app.on("error",()=>{
        console.log("Application not able to talk to express",error);
    })
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server started at port ${process.env.PORT||8000}`);
    })
}).catch((error)=>{
    console.log("Application not able to talk with express",error)
    process.exit(1)
})


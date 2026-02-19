import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"./src/public/temp");
    },
    filename: (req,file,cb) =>{
        const uniqueFileName = Date.now()+"-"+file.originalname;
        cb(null, uniqueFileName)
    }
})

export const upload = multer({storage})
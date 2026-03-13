import {registerUser,loginUser,logoutUser} from "../controller/user.controller.js"
import {Router} from "express"
import {upload} from "../middlewares/multer.middleware.js"
import{verifyJwt} from "../middlewares/auth.middleware.js"
const router = Router();

router.route("/register")
      .post(upload.single("avatar"),registerUser);

router.post("/login",loginUser);
router.post("/logout",verifyJwt,logoutUser)

export default router  
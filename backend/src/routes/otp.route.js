import {Router} from "express"
const router = Router();
import {forgotPassword,verifyOtp,resetPassword} from "../controller/otp.controller.js"

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
      


export default router 
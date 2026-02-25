import {Router} from "express"
const router = Router();
import {forgotPassword,verifyOtp,resetPassword} from "../controller/otp.controller.js"
import {verifyEmail, sendOtpForEmail} from "../controller/verifyEamil.controller.js"

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.post("/email-verification/otp",sendOtpForEmail)
router.post("/email-verification",verifyEmail);   


export default router 
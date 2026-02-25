import {Router} from "express"
const router = Router();
import {forgotPassword,verifyOtp,resetPassword} from "../controller/otp.controller.js"
import {verifyEmail, sendOtpForEmail} from "../controller/verifyEamil.controller.js"
import {verifyJwt} from "../middlewares/auth.middleware.js"

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.post("/email-verification/otp",sendOtpForEmail)
router.post("/email-verification",verifyJwt,verifyEmail);   


export default router 
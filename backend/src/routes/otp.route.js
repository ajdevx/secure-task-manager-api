import {Router} from "express"
const router = Router();
import {forgotPassword} from "../controller/otp.controller.js"

router.route("/forgot-password")
      .post(forgotPassword);

export default router 
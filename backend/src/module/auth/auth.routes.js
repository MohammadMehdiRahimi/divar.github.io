import { Router } from "express";
import authController from "./auth.controller.js";
const router = Router();
router.post("/send-otp", authController.sendOTP);
router.post("/check-otp", authController.checkOTP);
router.post("/logout", authController.logout);
router.post('/check-token' , authController.checkToken)


export default router;

import { Router } from "express";
import authController from "./auth.controller.js";
const router = Router();
router.post("/send-otp", authController.sendOTP);
router.post("/check-otp", authController.checkOTP);
router.post("/logout", authController.logout);

export default router;

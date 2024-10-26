import { Router } from "express";
import userController from "./user.controller.js";
import { checkAuth } from "../../guard/auth.guard.js";
const router = Router();
router.get("/whoami", checkAuth, userController.whoami);

export default router;

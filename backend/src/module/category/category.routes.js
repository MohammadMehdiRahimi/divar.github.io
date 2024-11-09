import { Router } from "express";
import CategoryController from "./category.controller.js";
const router = Router();
router.post("/", CategoryController.createCategory);
router.get("/", CategoryController.findCategory);

export default router;

import { Router } from "express";
import { upload } from "../../config/multer.config.js";
import adsController from "./ads.controller.js";
const adsRoutes = Router();
adsRoutes.get("/category", adsController.createPostPage);
// adsRoutes.post("/create", upload.single("file"));
export default adsRoutes;

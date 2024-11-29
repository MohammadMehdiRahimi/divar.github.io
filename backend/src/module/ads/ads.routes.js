import { Router } from "express";
import { upload } from "../../config/multer.config.js";
import adsController from "./ads.controller.js";
import { checkAuth } from "../../guard/auth.guard.js";
const adsRoutes = Router();
adsRoutes.get("/category", adsController.createPostPage);
adsRoutes.post("/create", upload.array("images", 10), adsController.create);
adsRoutes.get("/get-ads", adsController.getAds);
adsRoutes.post('/get-many-ads' , checkAuth  , adsController.getManyAds)
adsRoutes.post("/get-my-ads", checkAuth, adsController.getMyAds);
export default adsRoutes;

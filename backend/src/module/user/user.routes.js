import { Router } from "express";
import userController from "./user.controller.js";
import { checkAuth } from "../../guard/auth.guard.js";
const router = Router();
router.get("/whoami", checkAuth, userController.whoami);
router.post("/mobile", userController.getUserMobile);
router.post("/add-bookmarks", checkAuth, userController.addBookmarks);
router.post('/delete-bookmarks' , checkAuth , userController.deleteBookmarks)
router.get('/bookmarks', checkAuth, userController.getBookmarks)
router.post('/add-recently', checkAuth, userController.addInRecentlyViewed)
router.post("/get-recently", checkAuth, userController.getRecentlyViewed);


export default router;

import userMessage from "./user.message.js";
import authMessage from "./user.message.js";
import userService from "./user.service.js";
export default class userController {
  static async whoami(req, res, next) {
    req?.user
      ? res.json({
          success: true,
          data: { message: userMessage.login, user: req.user },
        })
      : res
          .status(401)
          .json({ success: false, data: { message: authMessage.unauthorize } });
  }
  static async getUserMobile(req, res, next) {
    try {
      const { id } = req.body;
      const userMobile = await userService.getUserMobile(id);
      return res.json({
        success: true,
        data: { message: userMessage.done, body: userMobile },
      });
    } catch (error) {
      next(error);
    }
  }
  static async addBookmarks(req, res, next) {
    try {
      const { userId, adsId } = req.body;
      await userService.existBookmark(userId, adsId);
      await userService.addBookmarks(userId, adsId);
      return res.json({
        success: true,
        message: userMessage.addBookmarks,
        data: {},
      });
    } catch (error) {
      next(error);
    }
  }
  static async getBookmarks(req, res, next) {
    try {
      const { userId } = req.body;

      const bookmarks = await userService.getBookmarks(userId);
      return res.json({
        success: true,
        message: userMessage.getBookmarks,
        data: bookmarks,
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteBookmarks(req, res, next) {
    try {
      const { userId, adsId } = req.body;
      await userService.deleteBookmarks(userId, adsId);
      return res.json({
        success: true,
        message: userMessage.deleteBookmarks,
        body: {},
      });
    } catch (error) {
      next(error);
    }
  }
  static async addInRecentlyViewed(req, res, next) {
    try {
      const { userId, adsId } = req.body;
      await userService.addInRecentlyViewed(userId, adsId);
      return res.status(201).json({
        success: true,
        message: userMessage.addInRecentlyViewed,
        body: {},
      });
    } catch (error) {
      next(error);
    }
  }
  static async getRecentlyViewed(req, res, next) {
    try {
      const { userId } = req.body;
      const recentlyViewed = await userService.getRecentlyViewed(userId);
      return res.json({
        success: true,
        message: userMessage.done,
        body: recentlyViewed,
      });
    } catch (error) {
      next(error);
    }
  }
}

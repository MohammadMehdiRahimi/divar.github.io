import createHttpError from "http-errors";
import "dotenv/config";
import userMessage from "./user.message.js";
import userModel from "./user.model.js";

export default class userService {
  static async getUserMobile(userId) {
    try {
      const userMobile = await userModel
        .findById(userId)
        .select({ mobile: 1, _id: 0 });
      if (!userMobile) throw createHttpError.NotFound(userMessage.NotFound);
      return userMobile;
    } catch (error) {
      throw createHttpError.InternalServerError(error.message);
    }
  }
  static async addBookmarks(userId, adsId) {
    try {
      const user = await this.getUser(userId, true);
      user.bookmarks = [...user.bookmarks, adsId];
      await user.save();
      return true;
    } catch (error) {
      throw createHttpError.InternalServerError(error.message);
    }
  }

  static async getBookmarks(userId) {
    try {
      const user = await this.getUser(userId, true);
      return user.bookmarks;
    } catch (error) {
      throw createHttpError.InternalServerError(error.message);
    }
  }
  static async existBookmark(userId, adsId) {
    try {
      const user = await this.getUser(userId, true);
      if (user.bookmarks.includes(adsId))
        throw createHttpError.Conflict(userMessage.bookmarkAlreadyExist);
      return;
    } catch (error) {
      throw createHttpError.InternalServerError(error.message);
    }
  }
  static async getUser(userId, withError = false) {
    try {
      const user = await userModel.findById(userId);
      if (!user && withError)
        throw createHttpError.NotFound(userMessage.NotFound);
      if (!user) return false;
      return user;
    } catch (error) {
      throw createHttpError.InternalServerError(error.message);
    }
  }
  static async deleteBookmarks(userId, adsId) {
    try {
      const user = await this.getUser(userId, true);
      const idx = user.bookmarks.indexOf(adsId);
      if (idx > -1) {
        user.bookmarks.splice(idx, 1);
        await user.save();
        return true;
      } else {
        throw createHttpError.NotFound(userMessage.NotFoundBookmark);
      }
    } catch (error) {
      throw createHttpError.InternalServerError(error.message);
    }
  }
  static async addInRecentlyViewed(userId, adsId) {
    try {
      const updated = await userModel.findByIdAndUpdate(
        userId,
        {
          $push: {
            recentlyViewed: {
              $each: [adsId],
              $position: 0,
              $slice: 10,
            },
          },
        },
        {
          new: true,
        }
      );
      return updated;
    } catch (error) {
      throw createHttpError.InternalServerError(error.message);
    }
  }
  static async getRecentlyViewed(userId) {
    try {
      const user = await this.getUser(userId, true);
      return user.recentlyViewed;
    } catch (error) {
      throw createHttpError.InternalServerError(error.message);
    }
  }
}

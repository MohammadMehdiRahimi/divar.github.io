import createHttpError from "http-errors";
import Category from "../category/category.model.js";
import { adsMessage } from "./ads.message.js";
export default class adsController {
  static async createPostPage(req, res, next) {
    try {
      let { slug } = req.query;
      let match = { parent: null };
      let isChild = false;
      if (slug) {
        slug = slug.trim();
        const category = await Category.findOne({ slug });
        if (!category) throw new createHttpError.NotFound(adsMessage.NotFound);
        isChild = true;
        match = { parent: category._id };
      }
      const category = await Category.aggregate([
        {
          $match: match,
        },
      ]);
      return res.json({
        success: true,
        data: { message: adsMessage.getSuccess, body: category, isChild },
      });
    } catch (error) {
      next(error);
    }
  }
}

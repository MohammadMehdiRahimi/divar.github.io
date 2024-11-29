import createHttpError from "http-errors";
import Category from "../category/category.model.js";
import { adsMessage } from "./ads.message.js";
import adsService from "./ads.service.js";
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
  static async create(req, res, next) {
    try {
      if (req.body && req.files) {
        await adsService.create([req.body, req.files]);
        return res.json({
          success: true,
          data: { message: adsMessage.create },
        });
      }
    } catch (error) {
      next(error);
    }
  }
  static async getAds(req, res, next) {
    try {
      const { query } = req;
      const ads = await adsService.getAds(query);
      return res.json({
        success: true,
        data: { message: adsMessage.getAds, body: ads },
      });
    } catch (error) {
      next(error);
    }
  }
  static async getManyAds(req, res, next) {
    try {
      const { adsIds } = req.body;
      const adsList = await adsService.getManyAds(adsIds);
      return res.json({
        success: true,
        message: adsMessage.getManyAdsSuccess,
        body: adsList,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getMyAds(req, res, next) {
    try {
      const { userId } = req.body;

      const myAds = await adsService.getMyAds(userId);
      return res.json({
        success: true,
        message: adsMessage.getManyAdsSuccess,
        body: myAds,
      });
    } catch (error) {
      next(error);
    }
  }
}

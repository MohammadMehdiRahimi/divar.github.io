import createHttpError from "http-errors";
import adsModel from "./ads.model.js";
import mongoose from "mongoose";
export default class adsService {
  static async create([body, files]) {
    try {
      let images = [];
      images = files.map((file) => file.filename);

      const data = { ...body, images };
      await adsModel.create(data);
      return;
    } catch (error) {
      throw createHttpError.InternalServerError(error.message);
    }
  }
  static async getAds(filter) {
    try {
      const ads = await adsModel
        .find(filter)
        .sort({ updatedAt: -1 })
        .select({ __v: 0 });
      return ads;
    } catch (error) {
      throw createHttpError.InternalServerError(error.message);
    }
  }
  static async getManyAds(adsIds) {
    try {
      const adsList = await adsModel.find({
        _id: { $in: adsIds.map((adsId) => new mongoose.Types.ObjectId(adsId)) },
      });
      return adsList;
    } catch (error) {
      throw createHttpError.InternalServerError(error.message);
    }
  }
  static async getMyAds(userId) {
    try {
      return await adsModel.find({
        author: new mongoose.Types.ObjectId(userId),
      });
    } catch (error) {
      throw createHttpError.InternalServerError(error.message);
    }
  }
}

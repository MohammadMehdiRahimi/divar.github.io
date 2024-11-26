import slugify from "slugify";
import { optionMessage } from "./option.message.js";
import optionModel from "./options.model.js";
import createHttpError from "http-errors";
import CategoryService from "../category/category.service.js";
import { constNames } from "../exportConstNames.js";
import { isValidObjectId } from "mongoose";
export default class optionService {
  static async checkExistOption(id, withError = false) {
    try {
      const option = await optionModel.findById(id);
      if (!option) {
        if (withError) throw createHttpError.NotFound("notFound user");
        return false;
      }
      return option;
    } catch (error) {
      throw createHttpError.InternalServerError(error.message);
    }
  }
  static async create(optionDto) {
    try {
      const category = await CategoryService.checkExistCategory(
        optionDto.category
      );
      optionDto.category = category._id;
      optionDto.key = slugify(optionDto.key, {
        trim: true,
        replacement: "_",
        lower: true,
      });
      await optionService.alreadyExistByCategoryAndKey(
        optionDto.category,
        optionDto.key
      );
      if (optionDto?.enum && typeof optionDto.enum == "string") {
        optionDto.enum = optionDto.enum.split(",");
      } else if (!Array.isArray(optionDto.enum)) {
        optionDto.enum = [];
      }
      const option = await optionModel.create(optionDto);
      return option;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async alreadyExistByCategoryAndKey(category, key) {
    try {
      const isExist = await optionModel.find({ category, key });
      if (isExist.length)
        throw createHttpError.Conflict(optionMessage.keyConflict);
      return null;
    } catch (error) {
      throw createHttpError.InternalServerError(
        "Key existence check error: " + error.message
      );
    }
  }
  static async findAll() {
    try {
      const options = await optionModel
        .find({}, { __v: 0 }, { sort: { _id: -1 } })
        .populate([{ path: "category", select: { slug: 1, name: 1 } }]);
      return options;
    } catch (error) {
      throw createHttpError.InternalServerError(
        "Error finding options: " + error.message
      );
    }
  }
  static async getOptionById(optionId) {
    try {
      const options = await optionModel.findById(optionId);
      return options;
    } catch (error) {
      throw createHttpError.InternalServerError(
        "can not get options by id : " + error.message
      );
    }
  }
  static async getCategoryOption(categoryId) {
    try {
      const options = await optionModel.find(
        { category: categoryId },
        { __v: 0 }
      );
      return options;
    } catch (error) {
      throw createHttpError.InternalServerError(
        "get category options error : " + error.message
      );
    }
  }
  static async getOptionBySlug(slug) {
    try {
      const options = await optionModel.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $match: { "category.slug": slug },
        },
        { $unwind: "$category" },
        {
          $addFields: {
            categorySlug: "$category.slug",
            categoryIcon: "$category.icon",
            categoryName: "$category.name",
          },
        },

        {
          $project: {
            __v: 0,
            category: 0,
          },
        },
      ]);
      return options;
    } catch (error) {
      throw createHttpError.InternalServerError(error.message);
    }
  }
  static async removeOptionById(optionId) {
    try {
      await this.checkExistOption(optionId, true);
      const result = await optionModel.deleteOne({ _id: optionId });
      return result;
    } catch (error) {
      throw createHttpError.InternalServerError(error.message);
    }
  }
  static async update(id, optionDto) {
    try {
      Object.keys(optionDto).forEach((key) => {
        if (
          optionDto[key] == null ||
          optionDto[key] == undefined ||
          optionDto[key] == "" ||
          optionDto[key] == " "
        )
          delete optionDto[key];
      });
      const existOption = await this.checkExistOption(id, true);
      if (optionDto.category && isValidObjectId(optionDto.category)) {
        const category = await CategoryService.checkExistCategory(
          optionDto.category
        );
        optionDto.category = category._id;
      } else {
        delete optionDto.category;
      }
      if (optionDto.key)
        optionDto.key = slugify(optionDto.key, {
          trim: true,
          replacement: "_",
          lower: true,
        });
      if (typeof optionDto.enums === "string") {
        optionDto.enums = optionDto.enums.split(",");
        2;
      }
      if (optionDto.required == "true") optionDto.required = true;
      if (optionDto.required == "false") optionDto.required = false;
      id = existOption._id;
      await optionModel.updateOne({ _id: id }, { $set: optionDto });

      return;
    } catch (error) {
      throw createHttpError.InternalServerError(error.message);
    }
  }
}

import slugify from "slugify";
import { optionMessage } from "./option.message";
import optionModel from "./options.model";
import createHttpError from "http-errors";
export default class optionService {
  static async create(optionDto) {
    try {
      const category = await optionService.checkExistById(optionDto.category);
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
  static async checkExistById(id) {
    try {
      const category = await optionModel.findById(id);
      if (!category)
        throw createHttpError.NotFound(optionMessage.NotFoundCategory);
      return category;
    } catch (error) {
      throw new Error("Check exista category error : " + error);
    }
  }
  static async alreadyExistByCategoryAndKey(category, key) {
    try {
      const isExist = await optionModel.find({ category, key });
      if (isExist) throw createHttpError.Conflict(optionMessage.keyConflict);
      return null;
    } catch (error) {
      throw new Error("already exist key in this category error  : " + error);
    }
  }
}

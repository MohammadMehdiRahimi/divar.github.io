import { isValidObjectId, Types } from "mongoose";
import Category from "./category.model.js";
import categoryMessage from "./category.message.js";
import createHttpError from "http-errors";
import slugify from "slugify";
export default class CategoryService {
  static async create(categoryDto) {
    if (categoryDto.parent == "") {
      delete categoryDto.parent;
    }
    if (categoryDto.parent && isValidObjectId(categoryDto.parent)) {
      const parent = await CategoryService.checkExistCategory(
        categoryDto.parent
      );

      categoryDto.parent = parent._id.toString();
      categoryDto.parents = [
        ...new Set(
          [parent._id.toString()].concat(
            parent.parents.map((parentId) => parentId.toString())
          )
        ),
      ];
    }
    if (categoryDto.slug) {
      await this.slugAlreadyExist(slugify(categoryDto.slug));
      categoryDto.slug = slugify(categoryDto.slug);
    } else {
      categoryDto.slug = slugify(categoryDto.name);
    }
    try {
      const category = await Category.create(categoryDto);

      return category;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async checkExistCategory(id) {
    try {
      const category = await Category.findById(id);
      if (!category)
        throw new createHttpError.NotFound(categoryMessage.parentNotFound);
      return category;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async checkExistSlug(slug) {
    try {
      const category = await Category.findOne({ slug });
      if (!category)
        throw new createHttpError.NotFound(categoryMessage.NotFound);
      return category;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async slugAlreadyExist(slug) {
    try {
      const category = await Category.findOne({ slug });
      if (category)
        throw new createHttpError.Conflict(`slug ` + categoryMessage.conflict);
      return category;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async find() {
    try {
      return await Category.find({ parent: { $exists: false } });
    } catch (error) {
      throw new createHttpError.InternalServerError(
        "Failed to find categories"
      );
    }
  }
  // static async findBySlug(slug) {
  //   try {
  //     const category = await Category.find({ slug });
  //     if (!category) {
  //       throw createHttpError.NotFound(categoryMessage.NotFound);
  //     }
  //     return category;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
}

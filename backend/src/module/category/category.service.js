import { isValidObjectId } from "mongoose";
import categoryModel from "./Category.model.js";
import createHttpError from "http-errors";
import slugify from "slugify";
export default class CategoryService {
  static async create(categoryDto) {
    //     const { icon, name, parent, slug } = categoryDto;

    if (categoryDto.parent && isValidObjectId(categoryDto.parent)) {
      const parentCategory = await CategoryService.checkExistCategory(
        categoryDto.parent
      );
      categoryDto.parents = new Set([
        ...parentCategory?.parents.map(
          (id) => id.toString(),
          categoryDto.parent.toString()
        ),
      ]);
    }
    if (categoryDto.slug) {
      await CategoryService.slugAlreadyExist(slugify(categoryDto.slug));
    } else {
      categoryDto.slug = slugify(categoryDto.name);
    }
  }
  static async checkExistCategory(id) {
    try {
      const category = await categoryModel.findById(id);
      if (!category)
        throw new createHttpError.NotFound(categoryMessage.NotFound);
      return category;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async checkExistSlug(slug) {
    try {
      const slug = await categoryModel.findById(slug);
      if (!slug) throw new createHttpError.NotFound(categoryMessage.NotFound);
      return slug;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async slugAlreadyExist(slug) {
    try {
      const slug = await categoryModel.findById(slug);
      if (slug)
        throw new createHttpError.Conflict(`slug ` + categoryMessage.conflict);
      return slug;
    } catch (error) {
      throw new Error(error);
    }
  }
}

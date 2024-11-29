import CategoryService from "./category.service.js";
import HttpCode from "http-codes";
import categoryMessage from "./category.message.js";
export default class CategoryController {
  static async createCategory(req, res, next) {
    try {
      const { name, slug, icon, parent } = req.body;
      const result = await CategoryService.create({
        name,
        slug,
        icon,
        parent,
      });
      return res.status(200).json({
        success: true,
        data: { message: categoryMessage.created },
      });
    } catch (error) {
      next(error);
    }
  }
  static async findCategory(req, res, next) {
    try {
      const categories = await CategoryService.find();
      return res.json({
        success: true,
        data: { message: categoryMessage.getCategories, body: categories },
      });
    } catch (error) {
      next(error);
    }
  }
  // static async findCategoryBySlug(req, res, next) {
  //   try {
  //     const { slug } = req.query;
  //     const category = await CategoryService.findBySlug(slug);
  //     return res.json({
  //       success: true,
  //       data: { message: categoryMessage.getCategories, body: category },
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

import CategoryService from "./category.service.js";
import HttpCode from "http-codes";
export default class CategoryController {
  static async createCategory(req, res, next) {
    try {
      const { name, slug, icon, parent } = req.body;
      await CategoryService.create({ name, slug, icon, parent });
      return res
        .status(HttpCode.CREATED)
        .json({ success: true, data: { message: categoryMessage.created } });
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
}

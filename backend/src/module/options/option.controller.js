import { optionMessage } from "./option.message.js";
import optionService from "./option.service.js";

export default class optionController {
  static async create(req, res, next) {
    const { title, key, type, enums, guid, category, required } = req.body;
    try {
      await optionService.create({
        title,
        key,
        type,
        enums,
        guid,
        category,
        required,
      });
      return res.status(201).json({
        success: true,
        data: { message: optionMessage.create },
      });
    } catch (error) {
      next(error);
    }
  }
  static async findAll(req, res, next) {
    try {
      const options = await optionService.findAll();
      return res.json({
        success: true,
        data: { message: optionMessage.find, body: options },
      });
    } catch (error) {
      next(error);
    }
  }
  static async getOptionById(req, res, next) {
    try {
      const { optionId } = req.params;
      const options = await optionService.getOptionById(optionId);
      return res.json({
        success: true,
        data: { message: optionMessage.find, body: options },
      });
    } catch (error) {
      next(error);
    }
  }
  static async getCategoryOption(req, res, next) {
    try {
      const { categoryId } = req.params;
      const options = await optionService.getCategoryOption(categoryId);
      return res.json({
        success: true,
        data: { message: optionMessage.find, body: options },
      });
    } catch (error) {
      next(error);
    }
  }
  static async getOptionBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const options = await optionService.getOptionBySlug(slug);
      return res.json({
        success: true,
        data: { message: optionMessage.getOptionSlug, body: options },
      });
    } catch (error) {
      next(error);
    }
  }
  static async removeOptionbyId(req, res, next) {
    try {
      const { id } = req.body;
      await optionService.removeOptionById(id);
      return res.json({
        success: true,
        data: { message: optionMessage.deleteOption, body: null },
      });
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      const { id, title, key, type, enums, guid, category, required } =
        req.body;
      const optionDto = { title, key, type, enums, guid, category, required };
      await optionService.update(id, optionDto);
      return res.json({
        success: true,
        data: { message: optionMessage.update, body: null },
      });
    } catch (error) {
      next(error);
    }
  }
}

import { optionMessage } from "./option.message";
import optionService from "./option.service";

export default class optionController {
  static async create(req, res) {
    const { title, key, type, enums, guid, category } = req.body;
    await optionService.create({ title, key, type, enums, guid, category });
    return res.json({ success: true, data: { message: optionMessage.create } });
  }
}

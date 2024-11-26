import { Schema, Types, model } from "mongoose";
import { constNames } from "../exportConstNames.js";
const optionSchema = new Schema({
  title: { type: String, required: true },
  key: { type: String, required: true, unique: true },
  type: { type: String, enum: ["number", "string", "array", "boolean"] },
  enums: { type: Array, default: [] },
  guid: { type: String, required: false },
  required: { type: Boolean, required: false, default: false },
  category: {
    type: Types.ObjectId,
    ref: constNames.categoryModel,
    required: true,
  },
});

const optionModel = model(constNames.optionModel, optionSchema);
export default optionModel;

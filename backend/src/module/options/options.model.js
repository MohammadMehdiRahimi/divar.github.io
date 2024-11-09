import { Schema, Types, model } from "mongoose";
import { constNames } from "../exportConstNames";
const optionSchema = new Schema({
  title: { type: String, required: true },
  key: { type: String, required: true },
  type: { type: String, enum: ["number", "string", "array", "boolean"] },
  enum: { type: Array, default: [] },
  guid: { type: String, required: false },
  category: {
    type: Types.ObjectId,
    ref: constNames.categoryModel,
    required: true,
  },
});

const optionModel = model(constNames.optionModel, optionSchema);
export default optionModel;

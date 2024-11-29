import { Schema, Types, model } from "mongoose";
import { constNames } from "../exportConstNames.js";
const adsSchema = new Schema(
  {
    author: { type: Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    categoryId: {
      type: Types.ObjectId,
      ref: constNames.categoryModel,
      required: true,
    },
    province: { type: String, required: true },
    city: { type: String, required: true },
    coordinate: { type: [String] },
    images: { type: [String], required: false, default: [] },
    options: { type: [Object], default: [] },
    isUp: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const adsModel = model(constNames.adsModel, adsSchema);

export default adsModel;

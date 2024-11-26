import { Schema, Types, model } from "mongoose";
import { constNames } from "../exportConstNames.js";
const adsSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: Stirng, required: true },
    category: {
      type: Types.ObjectId,
      ref: constNames.categoryModel,
      required: true,
    },
    province: { type: String, required: true },
    districted: { type: String, required: true },
    cordinate: { type: [Number], required: true },
    images: { type: [String], required: false, default: [] },
  },
  { timestamps: true }
);

const adsModel = model(constNames.adsModel, adsSchema);

export default adsModel;

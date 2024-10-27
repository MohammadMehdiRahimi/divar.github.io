import { model, Schema, Types } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    icon: { type: String, required: true },
    parent: { type: Types.ObjectId, required: false, ref: "Category" },
    parents: {
      type: [Types.ObjectId],
      required: false,
      default: [],
      ref: "Category",
    },
  },
  { versionKey: false, id: false, toJSON: { virtuals: true } }
);
categorySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});

const categoryModel = model("categoryModel", categorySchema);
export default categoryModel;

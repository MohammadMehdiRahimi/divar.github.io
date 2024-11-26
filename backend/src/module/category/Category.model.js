import { model, Schema, Types } from "mongoose";
import { constNames } from "../exportConstNames.js";
const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    icon: { type: String, required: false },
    parent: {
      type: Types.ObjectId,
      ref: constNames.categoryModel,
      required: false,
    },
    parents: { type: [Types.ObjectId], required: false, default: [] },
    isTarget: { type: Boolean, required: false, default: false },
  },
  { versionKey: false, id: false, toJSON: { virtuals: true } }
);

categorySchema.virtual("children", {
  ref: constNames.categoryModel,
  localField: "_id",
  foreignField: "parent",
});
function autoPopulate(next) {
  this.populate([{ path: "children" }]);
  next();
}
categorySchema.pre("find", autoPopulate).pre("findOne", autoPopulate);
const Category = model(constNames.categoryModel, categorySchema);
export default Category;

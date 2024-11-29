import { Schema, model, Types } from "mongoose";
import { constNames } from "../exportConstNames.js";
const OTPSchema = new Schema({
  code: { type: String, required: false, default: null },
  expiresIn: { type: Number, required: false, default: 0 },
});

const userSchema = new Schema(
  {
    fullName: { type: String, required: false },
    mobile: { type: String, required: true, unique: true },
    verifiedMobile: { type: Boolean, required: false, default: false },
    otp: { type: OTPSchema },
    bookmarks: { type: [Types.ObjectId], ref: constNames.adsModel },
    recentlyViewed: { type: [Types.ObjectId], ref: constNames.adsModel },
  },
  { timestamps: true }
);
const userModel = model(constNames.userModel, userSchema);
export default userModel;

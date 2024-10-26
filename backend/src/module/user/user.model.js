import { Schema, model } from "mongoose";

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
  },
  { timestamps: true }
);
const userModel = model("user", userSchema);
export default userModel;

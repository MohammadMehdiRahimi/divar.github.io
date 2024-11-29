import createHttpError from "http-errors";
import { randomInt } from "crypto";
import "dotenv/config";
import mongoose from "mongoose";

import authMessage from "./auth.message.js";
import userModel from "../user/user.model.js";
import jwt from "jsonwebtoken";

export default class authService {
  static async sendOTP(mobile) {
    const now = Date.now();
    const user = await authService.checkUserExist(mobile, null, false);
    const otp = {
      code: randomInt(1000, 9999),
      expiresIn: Date.now() + 1000 * 60 * 2,
    };
    if (!user) {
      try {
        const newUser = await userModel.create({ mobile, otp });
        return { code: newUser.otp.code };
      } catch (error) {
        throw new Error(error.message);
      }
    }
    if (user.otp.code && user.otp.expiresIn > now)
      throw createHttpError.BadRequest(authMessage.otpNotExpire);
    try {
      user.otp = otp;
      const result = await user.save();

      return { code: result.otp.code };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async checkOTP(mobile, code) {
    let user;
    try {
      user = await authService.checkUserExist(mobile);
      if (!user) {
        throw createHttpError.NotFound(authMessage.notFoundUserError);
      }
      const now = Date.now();
      if (user?.otp?.expiresIn > now) {
        if (code == user?.otp?.code) {
          user.verifiedMobile = true;
          await user.save();
          return { expiresIn: true, code: true, id: user._id };
        } else {
          return { expiresIn: true, code: false };
        }
      } else {
        return { expiresIn: false, code: false };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async checkUserExist(mobile, id = null, withError = false) {
    if (id == null) {
      try {
        const user = await userModel.findOne({ mobile });
        if (!user && withError)
          throw createHttpError.NotFound(authMessage.notFoundUserError);
        else if (!user && !withError) {
          return false;
        }
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    } else {
      try {
        const objectId = new mongoose.Types.ObjectId(id);
        const user = await userModel.findOne({
          _id: objectId,
        });
        if (!user && withError)
          throw createHttpError.NotFound(authMessage.notFoundUserError);
        else if (!user && !withError) {
          return false;
        }
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
  static async jwtSign(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });
    return token;
  }
  static async checkToken(token) {
    try {
      const authorizedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const { _id: id, bookmarks } = await authService.checkUserExist(
        null,
        authorizedToken.id,
        true
      );
      return { id, bookmarks };
    } catch (error) {
      throw createHttpError.Unauthorized(error.message);
    }
  }
}

import createHttpError from "http-errors";
import { randomInt } from "crypto";
import mongoose from "mongoose";
import "dotenv/config";

import userMessage from "./user.message.js";
import userModel from "./user.model.js";
import jwt from "jsonwebtoken";
import authService from "../auth/auth.service.js";
import authMessage from "./user.message.js";

export default class userService {
  static async whoami(token) {
    const { id } = await jwt.verify(
      token,
      "kjdKLJSDFJSDFJ@dskf&$9$234*&&%^fajsdfl"
    );

    // console.log(objectId);
    const result = await authService.checkUserExist(null, id);
    // if (!result)
    //   throw new createHttpError.NotFound(authMessage.notFoundUserError);
    // return res.json({ success: true, data: { user: result } });
  }
}

import jwt from "jsonwebtoken";
import "dotenv/config";
import createHttpError from "http-errors";
import authMessage from "../module/auth/auth.message.js";
import authService from "../module/auth/auth.service.js";
import mongoose from "mongoose";

export const checkAuth = async (req, res, next) => {
  try {
    // console.log(req.headers);
    let token = req?.cookies?.authorization ?? req.headers.authorization;
    if (!token) throw new createHttpError.Unauthorized(authMessage.unauthorize);
    const data = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);
    if (data?.id) {
      const user = await authService.checkUserExist(null, data.id);
      if (!user) {
        return res.status(404).josn({
          success: false,
          data: { message: authMessage.notFoundUserError },
        });
      }
      req.user = { id: user._id };
      next();
    } else {
      throw new createHttpError.NotFound(authMessage.invalidToken);
    }
  } catch (error) {
    next(error);
  }
};

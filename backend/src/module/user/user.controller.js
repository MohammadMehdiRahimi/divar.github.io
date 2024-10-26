import userMessage from "./user.message.js";
import authMessage from "./user.message.js";
export default class userController {
  static async whoami(req, res, next) {
    req?.user
      ? res.json({
          success: true,
          data: { message: userMessage.login, user: req.user },
        })
      : res
          .status(401)
          .json({ success: false, data: { message: authMessage.unauthorize } });
  }
}

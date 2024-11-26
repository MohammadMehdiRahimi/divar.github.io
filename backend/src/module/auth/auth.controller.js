import authService from "./auth.service.js";
import authMessage from "./auth.message.js";
export default class authController {
  static async sendOTP(req, res, next) {
    try {
      const { mobile } = req.body;
      const code = await authService.sendOTP(mobile);
      res.json({
        success: true,
        data: {
          message: authMessage.sendOTPSuccessfully,
          code,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  static async checkOTP(req, res, next) {
    try {
      const { mobile, code } = req.body;
      const result = await authService.checkOTP(mobile, code);
      if (!result?.expiresIn) {
        return res.status(408).json({
          success: false,
          data: { message: authMessage.otpCodeExpired },
        });
      }
      if (!result?.code) {
        return res.status(401).json({
          success: false,
          data: { message: authMessage.otpCodeWrong },
        });
      }
      if (result?.expiresIn && result?.code) {
        const token = await authService.jwtSign({ id: result?.id });

        return res
          .cookie("auth", token, {
            httpOnly: false,
            secure: false,
          })
          .json({
            success: true,
            data: {
              message: authMessage.checkOTPSuccessfully,
              token,
            },
          });
      }
      return res.status(400).json({
        success: false,
        data: { message: "something is wrong in check otp" },
      });
    } catch (error) {
      next(error);
    }
  }
  static async logout(req, res, next) {
    try {
      return res
        .clearCookie("authorization")
        .status(200)
        .json({ success: true, data: { message: authMessage.logOut } });
    } catch (error) {
      next(error);
    }
  }
  static async checkToken(req, res, next) {
    const { token } = req.body;
    if (token) {
      try {
        await authService.checkToken(token);
        return res.json({
          success: true,
          data: { message: authMessage.userExist },
        });
      } catch (error) {

        next(error);
      }
    } else {
      return res
        .status(401)
        .json({ success: false, data: { message: authMessage.invalidToken } });
    }
  }
}

import createHttpError from "http-errors";

export default class allException {
  static async notFound(app) {
    app.use((req, res, next) => {
      next(createHttpError.NotFound("not found route"));
    });
  }
  static async generalErrorHandler(app) {
    app.use((err, req, res, next) => {
      console.log("🚀 ~ allException ~ app.use ~ err:", err);
      const statusCode = err?.status ?? err?.statusCode ?? 500;

      const message = err?.message ?? err?.stack ?? "Internal Server Error";
      res
        .status(statusCode)
        .json({ success: false, status: statusCode, data: { message } });
    });
  }
}

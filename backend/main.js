import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import "./src/config/mongoose.config.js";
import { swaggerUiConfig } from "./src/config/swagger.config.js";
import mainRouter from "./src/app.routes.js";
import allException from "./src/common/exception/all-exception.handler.js";
async function main() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
  swaggerUiConfig(app);
  app.use(mainRouter);
  allException.notFound(app);

  allException.generalErrorHandler(app);

  const PORT = process.env.PORT;
  app.listen(PORT, () =>
    console.log(`server : http://localhost:${PORT}/api-docs`)
  );
}
main();

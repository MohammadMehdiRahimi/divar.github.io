import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

export function swaggerUiConfig(app) {
  const setConfigSwaggerJsDoc = swaggerJSDoc({
    definition: {
      openapi: "3.0.0",
      info: { title: "Divar-backend", description: "divar", version: "1.0.0" },
    },
    apis: [process.cwd() + "/src/module/**/*.swagger.js"],
  });
  const swaggerUiConfig = swaggerUi.setup(setConfigSwaggerJsDoc, {});
  app.use("/api-docs", swaggerUi.serve, swaggerUiConfig);
}

import { Router } from "express";
import optionController from "./option.controller.js";
const optionRouter = Router();

optionRouter.post("/", optionController.create);
optionRouter.get("/", optionController.findAll);
optionRouter.delete("/", optionController.removeOptionbyId);
optionRouter.put("/", optionController.update);
optionRouter.get(
  "/category-option-by-id/:categoryId",
  optionController.getCategoryOption
);
optionRouter.get(
  "/category-option-by-slug/:slug",
  optionController.getOptionBySlug
);

optionRouter.get("/get-by-id/:optionId", optionController.getOptionById);

export default optionRouter;

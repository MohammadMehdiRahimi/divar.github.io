import { Router } from "express";
import authRouter from "./module/auth/auth.routes.js";
import userRouter from "./module/user/user.routes.js";
import categoryRouter from "./module/category/category.routes.js";
import optionRouter from "./module/options/option.routes.js";
import adsRoutes from "./module/ads/ads.routes.js";
const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/category", categoryRouter);
mainRouter.use("/option", optionRouter);
mainRouter.use("/ads", adsRoutes);

export default mainRouter;

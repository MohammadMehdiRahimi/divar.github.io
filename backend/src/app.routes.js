import { Router } from "express";
import authRouter from "./module/auth/auth.routes.js";
import userRouter from "./module/user/user.routes.js";
const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/user", userRouter);

export default mainRouter;

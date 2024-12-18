import { Application, Request, Response } from "express";

import userRouter from "./router/userRouter";
import commentRouter from "./router/commentRouter";
export const mainApp = async (app: Application) => {
  try {
    app.use("/api/user", userRouter);
    app.use("/api/comment", commentRouter);
    app.get("/", (req: Request, res: Response) => {
      try {
        res.status(200).json({
          message: "welcome to the social media application",
        });
      } catch (error) {
        res.status(404).json({
          message: "error",
        });
      }
    });
  } catch (error) {
    return error;
  }
};

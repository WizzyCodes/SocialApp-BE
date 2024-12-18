import { Application, Request, Response } from "express";

export const mainApp = async (app: Application) => {
  try {
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

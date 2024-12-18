import { Request, Response } from "express";
import commentModel from "../model/commentModel";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const { userID } = req.params;

    const user = await commentModel.findById(userID);

    const comment: any = await commentModel.create({
      title,
      userID: user?._id,
    });
    return res.status(201).json({
      message: "comment created successfully",
      data: comment,
      status: 201,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating comment",
      status: 404,
    });
  }
};

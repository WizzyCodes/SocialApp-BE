import { Request, Response } from "express";
import commentModel from "../model/commentModel";
import postModel from "../model/postModel";
import { Types } from "mongoose";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const { userID } = req.params;

    const user: any = await commentModel.findById(userID);

    const post: any = await postModel.create({
      title,
      userID: user?._id,
    });

    user?.posts.push(new Types.ObjectId(post?._id));
    user?.save();

    return res.status(201).json({
      message: "comment created successfully",
      data: post,
      status: 201,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating comment",
      status: 404,
    });
  }
};

export const ReadComment = async (req: Request, res: Response) => {
  try {
    const { postID } = req.params;
    const user = await postModel.findById(postID).populate({
      path: "comment",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    return res
      .status(200)
      .json({ message: "Reading all users comment", data: user, status: 200 });
  } catch (error) {
    return res.status(404).json({
      message: "Error reading all users comment",
      status: 404,
    });
  }
};

// export const DelateOneComment = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const { userID } = req.params;
//     const user = await commentModel.findByIdAndDelete(userID);
//     if (!user) {
//       return res
//         .status(404)
//         .json({ message: "Comment not found", status: 404 });
//     }
//     return res.status(200).json({ message: "Comment deleted successfully" });
//   } catch (error) {
//     return res.status(404).json({ message: error, status: 404 });
//   }
// };

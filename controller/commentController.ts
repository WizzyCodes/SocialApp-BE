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

import userModel from "../model/userModel";
import postModel from "../model/postModel";
import { Types } from "mongoose";

export const createComment2 = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID, postID } = req.params;
    const { title } = req.body;

    const findUser = await userModel.findById(userID);
    if (findUser) {
      const findPost = await postModel.findById(postID);
      if (findPost) {
        const comment: any = await commentModel.create({
          title,
          createdAt: Date.now(),
        });
        findPost?.comments.push(new Types.ObjectId(comment?._id));
        findPost.save();

        return res.status(201).json({
          message: "User's comment created successfully",
          data: comment,
          status: 201,
        });
      } else {
        return res.status(404).json({
          error: "Error creating comment for post",
        });
      }
    } else {
      return res.status(404).json({
        error: "You are not authorized to create a comment, not a user",
      });
    }
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};

export const getAllCommentsOnPost = async (req: Request, res: Response) => {
  try {
    const { postID } = req.params;

    const post = await postModel.findById(postID).populate({
      path: "comments",
      model: commentModel,
      populate: [
        {
          path: "userID",
          model: userModel,
          select: "name email avatar",
        },
      ],
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json({
      message: "All comments on the post retrieved successfully",
      data: post.comments,
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while fetching comments",
      error: error,
    });
  }
};

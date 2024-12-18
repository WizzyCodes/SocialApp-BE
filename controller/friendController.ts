import { Request, Response } from "express";
import userModel from "../model/userModel";

export const addFriend = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID, friendID } = req.params;

    const user: any = await userModel.findById(userID);
    const friend: any = await userModel.findById(friendID);

    if (!user && !friend) {
      return res.status(404).json({
        message: "Error finding friend",
        status: 404,
      });
    } else {
      const check = user?.friends.some((el: any) => el === friendID);

      if (check) {
        return res.status(404).json({
          message: "You are already friends",
          status: 404,
        });
      } else {
        await userModel.findByIdAndUpdate(
          userID,
          {
            friends: [...user?.friends, friendID],
            following: [...user?.following, friendID],
          },
          { new: true }
        );

        await userModel.findByIdAndUpdate(
          friendID,
          {
            friends: [...friend?.friends, userID],
            follower: [...friend?.follower, userID],
          },
          { new: true }
        );
        return res.status(201).json({
          message: "friend added successfully",
          status: 201,
        });
      }
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error creating friend",
      status: 404,
    });
  }
};

export const unfriend = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID, friendID } = req.params;

    const user = await userModel.findById(userID);
    const friend = await userModel.findById(friendID);

    if (!user && !friend) {
      return res.status(404).json({
        message: "Couldnt find friend",
        status: 404,
      });
    } else {
      const check = user?.friends.some((el: any) => el === friendID);

      if (!check) {
        return res.status(404).json({
          message: "You are not friends",
          status: 404,
        });
      } else {
        let removeFriend = await userModel.findByIdAndUpdate(
          userID,
          {
            friends: user?.friends.filter((el: any) => el !== friendID),
            following: user?.friends.filter((el: any) => el !== friendID),
          },
          { new: true }
        );

        await userModel.findByIdAndUpdate(
          friendID,
          {
            friends: friend?.friends.filter((el: any) => userID),
            follower: friend?.follower.filter((el: any) => userID),
          },
          { new: true }
        );
        return res.status(201).json({
          message: "successfully removed friend",
          status: 201,
          data: removeFriend,
        });
      }
    }
  } catch (error) {
    return res.status(404).json({
      messsage: "couldnt unfollow",
      status: 404,
    });
  }
};

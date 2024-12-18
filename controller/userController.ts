import { Response, Request } from "express";
import userModel from "../model/userModel";
import cloudinary from "../util/cloudinary";
import path from "node:path";

export const createUser = async (req: any, res: Response) => {
  try {
    const { name, email, password, avatarID, avatar } = req.body;

    const folderPath = path.join(__dirname, "../uploads");

    const { secure_url, public_id }: any = await cloudinary.uploader.upload(
      req.file.path
    );

    const user = await userModel.create({
      name,
      email,
      password,
      avatar: secure_url,
      avatarID: public_id,
    });
  } catch (error) {
    return error;
  }
};

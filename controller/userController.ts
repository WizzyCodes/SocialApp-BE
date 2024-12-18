import { Response, Request } from "express";
import userModel from "../model/userModel";
import bcrypt from "bcrypt";
import cloudinary from "../util/cloudinary";
import path from "node:path";
import { removeFileUpload } from "../util/removeFileUpload";

export const createUser = async (
  req: any,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, password, avatarID, avatar } = req.body;

    const folderPath = path.join(__dirname, "../uploads");

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const { secure_url, public_id }: any = await cloudinary.uploader.upload(
      req.file.path
    );

    const user = await userModel.create({
      name,
      email,
      password: hashed,
      avatar: secure_url,
      avatarID: public_id,
    });
    removeFileUpload(folderPath);

    return res.status(201).json({
      message: "user created successfully",
      status: 201,
      data: user,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error creating user",
      status: 404,
      data: error,
    });
  }
};

export const logInUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { password, email } = req.body;

    const user = await userModel.findOne({
      email,
    });

    if (user) {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        return res.status(201).json({
          message: "user logged in successfully",
          status: 201,
          data: user,
        });
      } else {
        return res.status(404).json({
          status: 404,
          message: "error reading  password, your password is incorrect",
        });
      }
    } else {
      return res.status(404).json({
        status: 404,
        message:
          "error reading email address, your email address does not exist",
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "error logging in user",
      data: error,
    });
  }
};

export const readOneUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;

    const findUser = await userModel.findById(userID);

    return res.status(200).json({
      message: "user read successfully",
      status: 200,
      data: findUser,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error reading user",
      status: 404,
      data: error,
    });
  }
};
export const readAllUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const findAllUser = await userModel.find();

    return res.status(200).json({
      message: "all user read successfully",
      status: 200,
      data: findAllUser,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error reading all user",
      status: 404,
      data: error,
    });
  }
};

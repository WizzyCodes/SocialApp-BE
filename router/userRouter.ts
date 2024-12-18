import { Router } from "express";
import {
  createUser,
  readAllUser,
  readOneUser,
  logInUser,
} from "../controller/userController";
// import { addAsFriend, unFriend } from "../controller/friendController";
import { upload } from "../util/multer";
import { addFriend, unfriend } from "../controller/friendController";

const userRouter: any = Router();

userRouter.route("/create-user").post(upload, createUser);
userRouter.route("/login-user").post(logInUser);

userRouter.route("/get-one-user/:userID").get(readOneUser);
userRouter.route("/get-all-users").get(readAllUser);

// // friends
userRouter.route("/add-friend/:userID/:friendID").patch(addFriend);
userRouter.route("/un-friend/:userID/:friendID").patch(unfriend);

export default userRouter;

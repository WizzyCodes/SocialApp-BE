"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
// import { addAsFriend, unFriend } from "../controller/friendController";
const multer_1 = require("../util/multer");
const friendController_1 = require("../controller/friendController");
const userRouter = (0, express_1.Router)();
userRouter.route("/create-user").post(multer_1.upload, userController_1.createUser);
userRouter.route("/login-user").post(userController_1.logInUser);
userRouter.route("/get-one-user/:userID").get(userController_1.readOneUser);
userRouter.route("/get-all-users").get(userController_1.readAllUser);
// // friends
userRouter.route("/add-friend/:userID/:friendID").patch(friendController_1.addFriend);
userRouter.route("/un-friend/:userID/:friendID").patch(friendController_1.unfriend);
exports.default = userRouter;

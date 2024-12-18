import { Router } from "express";
import {
  createComment,
  getAllCommentsOnPost,
} from "../controller/commentController";

const commentRouter: any = Router();

commentRouter.route("/create-comment/:userID/:postID").post(createComment);

commentRouter.route("/post/:postID/comments").get(getAllCommentsOnPost);

export default commentRouter;

import { Router } from "express";
import {
  createComment,
  getAllCommentsOnPost,
  ReadComment,
} from "../controller/commentController";

const commentRouter: any = Router();

// commentRouter.route("/create-comment/:userID/:postID").post(createComment);

commentRouter.route("/post/:postID/comments").get(getAllCommentsOnPost);
commentRouter.route("/create-comment").post(createComment);
commentRouter.route("/read-comment").get(ReadComment);
export default commentRouter;

// router.route("/delete-comment").get(DelateOneComment);

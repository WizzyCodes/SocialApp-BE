import { Router } from "express";
import { createPost, readMainPost } from "../controller/postController";
import { upload } from "../util/multer";

const postRouter: any = Router();

postRouter.route("/create-post/:userID").post(upload, createPost);
postRouter.route("/read-post/:userID").get(readMainPost);

export default postRouter;

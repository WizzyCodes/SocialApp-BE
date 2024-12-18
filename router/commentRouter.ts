import { Router } from "express";
import {
  createComment,
<<<<<<< HEAD
  getAllCommentsOnPost,
} from "../controller/commentController";

const commentRouter: any = Router();

commentRouter.route("/create-comment/:userID/:postID").post(createComment);

commentRouter.route("/post/:postID/comments").get(getAllCommentsOnPost);

export default commentRouter;
=======
  //   DelateOneComment,
  ReadComment,
} from "../controller/commentController";

const router: any = Router();

router.route("/create-comment").post(createComment);
router.route("/read-comment").get(ReadComment);
// router.route("/delete-comment").get(DelateOneComment);

export default router;
>>>>>>> affd04b710dd231f9c7cbdb9cd2f0efc810943e7

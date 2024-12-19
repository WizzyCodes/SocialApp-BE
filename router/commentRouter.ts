import { Router } from "express";
import {
  createComment,
  //   DelateOneComment,
  ReadComment,
} from "../controller/commentController";

const router: any = Router();

router.route("/create-comment").post(createComment);
router.route("/read-comment").get(ReadComment);
// router.route("/delete-comment").get(DelateOneComment);

export default router;

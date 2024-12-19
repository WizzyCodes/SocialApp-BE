"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentController_1 = require("../controller/commentController");
const commentRouter = (0, express_1.Router)();
// commentRouter.route("/create-comment/:userID/:postID").post(createComment);
commentRouter.route("/post/:postID/comments").get(commentController_1.getAllCommentsOnPost);
commentRouter.route("/create-comment").post(commentController_1.createComment);
commentRouter.route("/read-comment").get(commentController_1.ReadComment);
exports.default = commentRouter;
// router.route("/delete-comment").get(DelateOneComment);
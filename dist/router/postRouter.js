"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../controller/postController");
const multer_1 = require("../util/multer");
const postRouter = (0, express_1.Router)();
postRouter.route("/create-post/:userID").post(multer_1.upload, postController_1.createPost);
postRouter.route("/read-post/:userID").get(postController_1.readMainPost);
exports.default = postRouter;

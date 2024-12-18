"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadComment = exports.getAllCommentsOnPost = exports.createComment2 = exports.createComment = void 0;
const commentModel_1 = __importDefault(require("../model/commentModel"));
const postModel_1 = __importDefault(require("../model/postModel"));
const mongoose_1 = require("mongoose");
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const { userID } = req.params;
        const user = yield commentModel_1.default.findById(userID);
        const post = yield postModel_1.default.create({
            title,
            userID: user === null || user === void 0 ? void 0 : user._id,
        });
        user === null || user === void 0 ? void 0 : user.posts.push(new mongoose_1.Types.ObjectId(post === null || post === void 0 ? void 0 : post._id));
        user === null || user === void 0 ? void 0 : user.save();
        return res.status(201).json({
            message: "comment created successfully",
            data: post,
            status: 201,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating comment",
            status: 404,
        });
    }
});
exports.createComment = createComment;
const userModel_1 = __importDefault(require("../model/userModel"));
const createComment2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, postID } = req.params;
        const { title } = req.body;
        const findUser = yield userModel_1.default.findById(userID);
        if (findUser) {
            const findPost = yield postModel_1.default.findById(postID);
            if (findPost) {
                const comment = yield commentModel_1.default.create({
                    title,
                    createdAt: Date.now(),
                });
                findPost === null || findPost === void 0 ? void 0 : findPost.comments.push(new mongoose_1.Types.ObjectId(comment === null || comment === void 0 ? void 0 : comment._id));
                findPost.save();
                return res.status(201).json({
                    message: "User's comment created successfully",
                    data: comment,
                    status: 201,
                });
            }
            else {
                return res.status(404).json({
                    error: "Error creating comment for post",
                });
            }
        }
        else {
            return res.status(404).json({
                error: "You are not authorized to create a comment, not a user",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            error: error,
        });
    }
});
exports.createComment2 = createComment2;
const getAllCommentsOnPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postID } = req.params;
        const post = yield postModel_1.default.findById(postID).populate({
            path: "comments",
            model: commentModel_1.default,
            populate: [
                {
                    path: "userID",
                    model: userModel_1.default,
                    select: "name email avatar",
                },
            ],
        });
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }
        return res.status(200).json({
            message: "All comments on the post retrieved successfully",
            data: post.comments,
            status: 200,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "An error occurred while fetching comments",
            error: error,
        });
    }
});
exports.getAllCommentsOnPost = getAllCommentsOnPost;
const ReadComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postID } = req.params;
        const user = yield postModel_1.default.findById(postID).populate({
            path: "comment",
            options: {
                sort: {
                    createdAt: -1,
                },
            },
        });
        return res
            .status(200)
            .json({ message: "Reading all users comment", data: user, status: 200 });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error reading all users comment",
            status: 404,
        });
    }
});
exports.ReadComment = ReadComment;
// export const DelateOneComment = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const { userID } = req.params;
//     const user = await commentModel.findByIdAndDelete(userID);
//     if (!user) {
//       return res
//         .status(404)
//         .json({ message: "Comment not found", status: 404 });
//     }
//     return res.status(200).json({ message: "Comment deleted successfully" });
//   } catch (error) {
//     return res.status(404).json({ message: error, status: 404 });
//   }
// };

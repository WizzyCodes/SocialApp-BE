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
exports.searchPost = exports.readMainPost = exports.test = exports.DelateOnePost = exports.ReadOnePost = exports.ReadAllPost = exports.createPost = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const cloudinary_1 = __importDefault(require("../util/cloudinary"));
const postModel_1 = __importDefault(require("../model/postModel"));
const mongoose_1 = require("mongoose");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, postImage, postImageID } = req.body;
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        const { secure_url, public_id } = yield cloudinary_1.default.uploader.upload(req.file.path);
        const post = yield postModel_1.default.create({
            title,
            postImage: secure_url,
            postImageID: public_id,
            userID,
        });
        user === null || user === void 0 ? void 0 : user.posts.push(new mongoose_1.Types.ObjectId(post === null || post === void 0 ? void 0 : post._id));
        user === null || user === void 0 ? void 0 : user.save();
        return res.status(201).json({
            message: "Post created successfully",
            status: 201,
            // data: post,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating post",
            status: 404,
        });
    }
});
exports.createPost = createPost;
const ReadAllPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield postModel_1.default.find().sort({
            createdAt: -1,
        });
        return res
            .status(200)
            .json({ message: "Reading all users post", data: user, status: 200 });
    }
    catch (error) {
        return res
            .status(404)
            .json({ message: "Error reading all users post", status: 404 });
    }
});
exports.ReadAllPost = ReadAllPost;
const ReadOnePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postID } = req.params;
        const user = yield postModel_1.default.findById(postID).populate({
            path: "posts",
            options: {
                sort: {
                    createdAt: -1,
                },
            },
        });
        return res
            .status(200)
            .json({ message: "Reading user post", data: user, status: 200 });
    }
    catch (error) {
        return res
            .status(404)
            .json({ message: "Error reading  user post", status: 404 });
    }
});
exports.ReadOnePost = ReadOnePost;
const DelateOnePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield postModel_1.default.findOneAndDelete();
        return res.status(200).json();
    }
    catch (error) {
        return res.status(404).json({ message: error, status: 404 });
    }
});
exports.DelateOnePost = DelateOnePost;
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield postModel_1.default.findOneAndDelete();
        return res.status(200).json();
    }
    catch (error) {
        return res.status(404).json({ message: error, status: 404 });
    }
});
exports.test = test;
const readMainPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        const friends = [...user.friends, userID];
        const post = yield postModel_1.default.find();
        let showPost = [];
        for (let i of post) {
            for (let e of friends) {
                if (i.userID === e) {
                    showPost.push(i);
                }
            }
        }
        return res.status(200).json({
            status: 200,
            data: showPost.sort((a, b) => a.createdAt + b.createdAt),
            message: "reading friends post",
        });
    }
    catch (error) {
        return res.status(404).json({ message: error, status: 404 });
    }
});
exports.readMainPost = readMainPost;
const searchPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.body;
        const user = yield postModel_1.default.find({ title: search });
        return res.status(200).json();
    }
    catch (error) {
        return res.status(404).json({ message: error, status: 404 });
    }
});
exports.searchPost = searchPost;

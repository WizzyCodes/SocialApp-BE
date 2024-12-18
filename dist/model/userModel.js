"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    avatar: {
        type: String,
    },
    avatarID: {
        type: String,
    },
    friends: [
        {
            type: {},
        },
    ],
    following: [
        {
            type: String,
        },
    ],
    follower: [
        {
            type: String,
        },
    ],
    posts: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "posts",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("users", userModel);

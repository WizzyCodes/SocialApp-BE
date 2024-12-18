"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postModel = new mongoose_1.Schema({
    title: {
        type: String,
    },
    userID: {
        type: String,
    },
    postImage: {
        type: String,
    },
    postImageID: {
        type: String,
    },
    comments: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "comments",
        },
    ],
});

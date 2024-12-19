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
exports.unfriend = exports.addFriend = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        const friend = yield userModel_1.default.findById(friendID);
        if (!user && !friend) {
            return res.status(404).json({
                message: "Error finding friend",
                status: 404,
            });
        }
        else {
            const check = user === null || user === void 0 ? void 0 : user.friends.some((el) => el === friendID);
            if (check) {
                return res.status(404).json({
                    message: "You are already friends",
                    status: 404,
                });
            }
            else {
                yield userModel_1.default.findByIdAndUpdate(userID, {
                    friends: [...user === null || user === void 0 ? void 0 : user.friends, friendID],
                    following: [...user === null || user === void 0 ? void 0 : user.following, friendID],
                }, { new: true });
                yield userModel_1.default.findByIdAndUpdate(friendID, {
                    friends: [...friend === null || friend === void 0 ? void 0 : friend.friends, userID],
                    follower: [...friend === null || friend === void 0 ? void 0 : friend.follower, userID],
                }, { new: true });
                return res.status(201).json({
                    message: "friend added successfully",
                    status: 201,
                });
            }
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating friend",
            status: 404,
        });
    }
});
exports.addFriend = addFriend;
const unfriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        const friend = yield userModel_1.default.findById(friendID);
        if (!user && !friend) {
            return res.status(404).json({
                message: "Couldnt find friend",
                status: 404,
            });
        }
        else {
            const check = user === null || user === void 0 ? void 0 : user.friends.some((el) => el === friendID);
            if (!check) {
                return res.status(404).json({
                    message: "You are not friends",
                    status: 404,
                });
            }
            else {
                let removeFriend = yield userModel_1.default.findByIdAndUpdate(userID, {
                    friends: user === null || user === void 0 ? void 0 : user.friends.filter((el) => el !== friendID),
                    following: user === null || user === void 0 ? void 0 : user.friends.filter((el) => el !== friendID),
                }, { new: true });
                yield userModel_1.default.findByIdAndUpdate(friendID, {
                    friends: friend === null || friend === void 0 ? void 0 : friend.friends.filter((el) => userID),
                    follower: friend === null || friend === void 0 ? void 0 : friend.follower.filter((el) => userID),
                }, { new: true });
                return res.status(201).json({
                    message: "successfully removed friend",
                    status: 201,
                    data: removeFriend,
                });
            }
        }
    }
    catch (error) {
        return res.status(404).json({
            messsage: "couldnt unfollow",
            status: 404,
        });
    }
});
exports.unfriend = unfriend;

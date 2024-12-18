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
exports.readAllUser = exports.readOneUser = exports.logInUser = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const cloudinary_1 = __importDefault(require("../util/cloudinary"));
const node_path_1 = __importDefault(require("node:path"));
const removeFileUpload_1 = require("../util/removeFileUpload");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, avatarID, avatar } = req.body;
        const folderPath = node_path_1.default.join(__dirname, "../uploads");
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const { secure_url, public_id } = yield cloudinary_1.default.uploader.upload(req.file.path);
        const user = yield userModel_1.default.create({
            name,
            email,
            password: hashed,
            avatar: secure_url,
            avatarID: public_id,
        });
        (0, removeFileUpload_1.removeFileUpload)(folderPath);
        return res.status(201).json({
            message: "user created successfully",
            status: 201,
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error creating user",
            status: 404,
            data: error,
        });
    }
});
exports.createUser = createUser;
const logInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, email } = req.body;
        const user = yield userModel_1.default.findOne({
            email,
        });
        if (user) {
            const check = yield bcrypt_1.default.compare(password, user.password);
            if (check) {
                return res.status(201).json({
                    message: "user logged in successfully",
                    status: 201,
                    data: user,
                });
            }
            else {
                return res.status(404).json({
                    status: 404,
                    message: "error reading  password, your password is incorrect",
                });
            }
        }
        else {
            return res.status(404).json({
                status: 404,
                message: "error reading email address, your email address does not exist",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            status: 404,
            message: "error logging in user",
            data: error,
        });
    }
});
exports.logInUser = logInUser;
const readOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const findUser = yield userModel_1.default.findById(userID);
        return res.status(200).json({
            message: "user read successfully",
            status: 200,
            data: findUser,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error reading user",
            status: 404,
            data: error,
        });
    }
});
exports.readOneUser = readOneUser;
const readAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAllUser = yield userModel_1.default.find();
        return res.status(200).json({
            message: "all user read successfully",
            status: 200,
            data: findAllUser,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "error reading all user",
            status: 404,
            data: error,
        });
    }
});
exports.readAllUser = readAllUser;

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
exports.loginUser = exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.getUserById = exports.addUser = void 0;
const logger_1 = require("../utils/logger");
const userModel_1 = require("../models/userModel");
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const addUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(userData.password, 10);
        const newUser = new userModel_1.User(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        yield newUser.save();
        logger_1.logger.info(`Added user: ${JSON.stringify(newUser)}`);
        return newUser;
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.logger.error(`failed to add user: ${error.message}`);
        }
        else {
            logger_1.logger.error('An unknown error occurred while adding new user');
        }
        throw error;
    }
});
exports.addUser = addUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid user ID");
        }
        const user = yield userModel_1.User.findById(id);
        if (!user) {
            logger_1.logger.error(`User with ${id} not found`);
            return null;
        }
        logger_1.logger.info(`Retreived user: ${JSON.stringify(user)}`);
        return user;
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.logger.error(`Failed to retreive user ${id}: ${error.message}`);
        }
        else {
            logger_1.logger.error(`An unknown error occurred while retreiving user with id: ${id}`);
        }
        throw error;
    }
});
exports.getUserById = getUserById;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.User.find();
        logger_1.logger.info(`Retreived all users: ${users.length} found`);
        return users;
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.logger.error(`Failed to retreive all users: ${error.message}`);
        }
        else {
            logger_1.logger.error('An unkown error occurred while retreiving all users');
        }
        throw error;
    }
});
exports.getAllUsers = getAllUsers;
const updateUser = (id, update) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid user ID!');
        }
        const updateUser = yield userModel_1.User.findByIdAndUpdate(id, update, { new: true });
        if (!updateUser) {
            logger_1.logger.error(`User with id ${id} not found`);
            return null;
        }
        logger_1.logger.info(`Updated new user with id ${JSON.stringify(updateUser)}`);
        return updateUser;
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.logger.error(`Failed to update new user with id ${id}: ${error.message}`);
        }
        else {
            logger_1.logger.error(`An unknown error occurred while update user with id ${id}`);
        }
        throw error;
    }
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid user ID!");
        }
        const deletedUser = yield userModel_1.User.findByIdAndDelete(id);
        if (!deletedUser) {
            logger_1.logger.error(`Product with id ${id} is not found!`);
            return false;
        }
        logger_1.logger.info(`Deleted user with id ${JSON.stringify(deletedUser)}`);
        return true;
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.logger.error(`Failed to delete user with id ${id}: ${error.message}`);
        }
        else {
            logger_1.logger.error(`An unknown error has occurred while deleting user with id ${id}`);
        }
        throw error;
    }
});
exports.deleteUser = deleteUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.User.findOne({ email });
        if (!user) {
            logger_1.logger.error(`User with email ${email} not found`);
            return null;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            logger_1.logger.error(`Invalid password for user ${email}`);
            return null;
        }
        logger_1.logger.info(`User ${email} logged in successfully`);
        return user;
    }
    catch (error) {
        if (error instanceof Error) {
            logger_1.logger.error(`Failed to login user ${email}: ${error.message}`);
        }
        else {
            logger_1.logger.error(`An unknown error occurred while logging in user ${email}`);
        }
        throw error;
    }
});
exports.loginUser = loginUser;

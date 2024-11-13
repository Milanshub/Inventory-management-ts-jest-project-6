"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const vitest_1 = require("vitest");
const userService = __importStar(require("../../src/services/userService"));
const userController_1 = require("../../src/controllers/userController");
const mongoose_1 = __importDefault(require("mongoose"));
const mockRequest = (body, params = {}) => ({
    body,
    params,
});
const mockResponse = () => {
    const res = {};
    res.status = vitest_1.vi.fn().mockReturnThis();
    res.json = vitest_1.vi.fn().mockReturnThis();
    return res;
};
(0, vitest_1.describe)('userController test suite', () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.it)('should add a user and return 201', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({ name: 'User A', email: 'someEmail', password: 'somePassword', role: 'user' });
        const res = mockResponse();
        const mockUser = { _id: new mongoose_1.default.Types.ObjectId(), name: 'User A', email: 'someEmail', password: 'somePassword', role: 'user' };
        const addUserSpy = vitest_1.vi.spyOn(userService, 'addUser').mockResolvedValue(mockUser);
        yield (0, userController_1.addUserController)(req, res);
        (0, vitest_1.expect)(addUserSpy).toHaveBeenCalledWith(req.body);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(201);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith(mockUser);
    }));
    (0, vitest_1.it)('should handle errors when adding a user and return 500', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({ name: 'User A', email: 'someEmail', password: 'somePassword', role: 'user' });
        const res = mockResponse();
        const errorMessage = 'Error adding user';
        const addUserSpy = vitest_1.vi.spyOn(userService, 'addUser').mockRejectedValue(new Error(errorMessage));
        yield (0, userController_1.addUserController)(req, res);
        (0, vitest_1.expect)(addUserSpy).toHaveBeenCalledWith(req.body);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(500);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith({ message: errorMessage });
    }));
    (0, vitest_1.it)('should get a user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUserId = '66f6bde7ae953a38af97d7d7';
        const mockUser = {
            _id: mockUserId,
            name: 'user A',
            email: 'someEmail',
            password: 'somePassword',
            role: 'user'
        };
        const reqGet = mockRequest({}, { id: mockUserId });
        const resGet = mockResponse();
        const getUserSpy = vitest_1.vi.spyOn(userService, 'getUserById').mockResolvedValue(mockUser);
        yield (0, userController_1.getUserByIdController)(reqGet, resGet);
        (0, vitest_1.expect)(getUserSpy).toHaveBeenCalledWith(mockUserId);
        (0, vitest_1.expect)(resGet.status).toHaveBeenCalledWith(200);
        (0, vitest_1.expect)(resGet.json).toHaveBeenCalledWith(mockUser);
    }));
    (0, vitest_1.it)('should return 404 when the user is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUserId = '66f6bde7ae953a38af97d7d7';
        const reqGet = mockRequest({}, { id: mockUserId });
        const resGet = mockResponse();
        const getUserSpy = vitest_1.vi.spyOn(userService, 'getUserById').mockResolvedValue(null);
        yield (0, userController_1.getUserByIdController)(reqGet, resGet);
        (0, vitest_1.expect)(getUserSpy).toHaveBeenCalledWith(mockUserId);
        (0, vitest_1.expect)(resGet.status).toHaveBeenCalledWith(404);
        (0, vitest_1.expect)(resGet.json).toHaveBeenCalledWith({ error: 'User not found' });
    }));
    (0, vitest_1.it)('should get all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUsers = [
            { _id: new mongoose_1.default.Types.ObjectId(), name: 'user A', email: 'someEmail', password: 'somePassword', role: 'user' },
            { _id: new mongoose_1.default.Types.ObjectId(), name: 'user B', email: 'someEmail2', password: 'somePassword2', role: 'user' },
        ];
        const req = mockRequest({});
        const res = mockResponse();
        const getAllUsersSpy = vitest_1.vi.spyOn(userService, 'getAllUsers').mockResolvedValue(mockUsers);
        yield (0, userController_1.getAllUsersController)(req, res);
        (0, vitest_1.expect)(getAllUsersSpy).toHaveBeenCalled();
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(200);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith(mockUsers);
    }));
    (0, vitest_1.it)('should handle errors when getting all users and return 500', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = mockRequest({});
        const res = mockResponse();
        const errorMessage = 'Error fetching users';
        const getAllUsersSpy = vitest_1.vi.spyOn(userService, 'getAllUsers').mockRejectedValue(new Error(errorMessage));
        yield (0, userController_1.getAllUsersController)(req, res);
        (0, vitest_1.expect)(getAllUsersSpy).toHaveBeenCalled();
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(500);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith({ message: errorMessage });
    }));
    (0, vitest_1.it)('should update a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUserId = '66f6bde7ae953a38af97d7d7';
        const req = mockRequest({ name: 'user A', email: 'someEmail', password: 'somePassword', role: 'user' }, { id: mockUserId });
        const res = mockResponse();
        const updatedUser = { _id: mockUserId, name: 'user A', email: 'someEmail', password: 'somePassword', role: 'user' };
        const updatedUserSpy = vitest_1.vi.spyOn(userService, 'updateUser').mockResolvedValue(updatedUser);
        yield (0, userController_1.updateUserController)(req, res);
        (0, vitest_1.expect)(updatedUserSpy).toHaveBeenCalledWith(mockUserId, req.body);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(200);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith(updatedUser);
    }));
    (0, vitest_1.it)('should return 404 when updating a user that does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUserId = '66f6bde7ae953a38af97d7d7';
        const req = mockRequest({ name: 'user A', email: 'someEmail', password: 'somePassword', role: 'user' }, { id: mockUserId });
        const res = mockResponse();
        const updatedUserSpy = vitest_1.vi.spyOn(userService, 'updateUser').mockResolvedValue(null);
        yield (0, userController_1.updateUserController)(req, res);
        (0, vitest_1.expect)(updatedUserSpy).toHaveBeenCalledWith(mockUserId, req.body);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(404);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith({ message: 'User not found!' });
    }));
    (0, vitest_1.it)('should handle error when updatig a user and return 500', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUserId = '66f6bde7ae953a38af97d7d7';
        const req = mockRequest({ name: 'user A', email: 'someEmail', password: 'somePassword', role: 'user' }, { id: mockUserId });
        const res = mockResponse();
        const errorMessage = 'Error updating user';
        const updatedUserSpy = vitest_1.vi.spyOn(userService, 'updateUser').mockRejectedValue(new Error(errorMessage));
        yield (0, userController_1.updateUserController)(req, res);
        (0, vitest_1.expect)(updatedUserSpy).toHaveBeenCalledWith(mockUserId, req.body);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(500);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith({ message: errorMessage });
    }));
    (0, vitest_1.it)('shoudl delete a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUserId = '66f6bde7ae953a38af97d7d7';
        const req = mockRequest({}, { id: mockUserId });
        const res = mockResponse();
        const deletedUser = { _id: mockUserId, name: 'user A', email: 'someEmail', password: 'somePassword', role: 'user' };
        // @ts-ignore
        const deleteUserSpy = vitest_1.vi.spyOn(userService, 'deleteUser').mockResolvedValue(deletedUser);
        yield (0, userController_1.deleteUserController)(req, res);
        (0, vitest_1.expect)(deleteUserSpy).toHaveBeenCalledWith(mockUserId);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(200);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully', data: deletedUser });
    }));
    (0, vitest_1.it)('should return 404 when deleting a user that does not exits', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUserId = '66f6bde7ae953a38af97d7d7';
        const req = mockRequest({}, { id: mockUserId });
        const res = mockResponse();
        // @ts-ignore
        const deleteUserSpy = vitest_1.vi.spyOn(userService, 'deleteUser').mockResolvedValue(null);
        yield (0, userController_1.deleteUserController)(req, res);
        (0, vitest_1.expect)(deleteUserSpy).toHaveBeenCalledWith(mockUserId);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(404);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith({ message: 'User not found!' });
    }));
    (0, vitest_1.it)('should handle errors when deleting a user and return 500', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUserId = '66f6bde7ae953a38af97d7d7';
        const req = mockRequest({}, { id: mockUserId });
        const res = mockResponse();
        const errorMessage = 'Error deleting user';
        const deleteUserSpy = vitest_1.vi.spyOn(userService, 'deleteUser').mockRejectedValue(new Error(errorMessage));
        yield (0, userController_1.deleteUserController)(req, res);
        (0, vitest_1.expect)(deleteUserSpy).toHaveBeenCalledWith(mockUserId);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(500);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith({ message: errorMessage });
    }));
});

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
const vitest_1 = require("vitest");
const userService_1 = require("../../src/services/userService");
const logger_1 = require("../../src/utils/logger");
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = require("../../src/models/userModel");
const mongodb_memory_server_1 = require("mongodb-memory-server");
vitest_1.vi.mock('../../src/utils/logger', () => ({
    logger: {
        info: vitest_1.vi.fn(),
        error: vitest_1.vi.fn(),
    },
}));
let mongoServer;
(0, vitest_1.describe)('userService test suite', () => {
    // Start MongoDB Memory Server and connect 
    (0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        yield mongoose_1.default.connect(uri);
    }));
    // stop Mongo Memory Server and disconnect from MongoDB 
    (0, vitest_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoServer.stop();
    }));
    (0, vitest_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        // Clear the collection before each test
        yield userModel_1.User.deleteMany({});
        // Clear all mock calls before each test
        vitest_1.vi.clearAllMocks();
    }));
    (0, vitest_1.it)('should add a user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUserInput = {
            name: "someUser",
            email: "someEmail@email.com",
            password: "somePassword",
            role: 'user'
        };
        const result = yield (0, userService_1.addUser)(mockUserInput);
        (0, vitest_1.expect)(result).toHaveProperty('_id');
        (0, vitest_1.expect)(result.name).toBe(mockUserInput.name);
        (0, vitest_1.expect)(result.email).toBe(mockUserInput.email);
        (0, vitest_1.expect)(result.role).toBe(mockUserInput.role);
        // Expect the password to be hashed (by checking typical bcrypt characteristics)
        (0, vitest_1.expect)(result.password).not.toBe(mockUserInput.password); // Confirm it's not plain text
        (0, vitest_1.expect)(result.password).toMatch(/^\$2[abxy]?\$.{56}$/); // Confirm bcrypt hash pattern
        (0, vitest_1.expect)(logger_1.logger.info).toHaveBeenCalledWith(`Added user: ${JSON.stringify(result)}`);
    }));
    (0, vitest_1.it)('should fail to add a user and log an error', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUserInput = {
            name: "someUser",
            email: "someEmail@email.com",
            password: "somePassword",
            role: 'user'
        };
        vitest_1.vi.spyOn(userModel_1.User.prototype, 'save').mockRejectedValueOnce(new Error('Save error'));
        yield (0, vitest_1.expect)((0, userService_1.addUser)(mockUserInput)).rejects.toThrow('Save error');
        (0, vitest_1.expect)(logger_1.logger.error).toHaveBeenCalledWith('failed to add user: Save error');
    }));
    (0, vitest_1.it)('should get a user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUserInput = {
            name: "someUser",
            email: "someEmail@email.com",
            password: "somePassword",
            role: 'user'
        };
        const addedUser = yield (0, userService_1.addUser)(mockUserInput);
        // Clear previous logger calls to isolate retrieval logging
        vitest_1.vi.clearAllMocks();
        // @ts-ignore
        const result = yield (0, userService_1.getUserById)(addedUser._id.toString());
        (0, vitest_1.expect)(result).toMatchObject({
            _id: addedUser._id,
            name: mockUserInput.name,
            email: mockUserInput.email,
            role: mockUserInput.role,
        });
        // Expect only the "retrieved user" log message
        (0, vitest_1.expect)(logger_1.logger.info).toHaveBeenCalledWith(`Retreived user: ${JSON.stringify(result)}`);
    }));
    (0, vitest_1.it)('should log an error and throw if getUserById is called with invalid ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidId = 'invalidId123';
        yield (0, vitest_1.expect)((0, userService_1.getUserById)(invalidId)).rejects.toThrow('Invalid user ID');
        (0, vitest_1.expect)(logger_1.logger.error).toHaveBeenCalledWith('Failed to retreive user invalidId123: Invalid user ID');
    }));
    (0, vitest_1.it)('should return null for an invalid ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidId = '123456789012345678901234'; // Example of an invalid MongoDB ID
        const result = yield (0, userService_1.getUserById)(invalidId);
        (0, vitest_1.expect)(result).toBeNull();
    }));
    (0, vitest_1.it)('should get all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUserInput1 = {
            name: "someUser1",
            email: "uniqueEmail1@email.com",
            password: "somePassword",
            role: 'user'
        };
        const mockUserInput2 = {
            name: "someUser2",
            email: "uniqueEmail2@email.com",
            password: "somePassword",
            role: 'user'
        };
        yield (0, userService_1.addUser)(mockUserInput1);
        yield (0, userService_1.addUser)(mockUserInput2);
        const users = yield (0, userService_1.getAllUsers)();
        // Exclude password from comparison because it’s hashed
        (0, vitest_1.expect)(users).toEqual(vitest_1.expect.arrayContaining([
            vitest_1.expect.objectContaining({
                name: mockUserInput1.name,
                email: mockUserInput1.email,
                role: mockUserInput1.role,
            }),
            vitest_1.expect.objectContaining({
                name: mockUserInput2.name,
                email: mockUserInput2.email,
                role: mockUserInput2.role,
            }),
        ]));
        (0, vitest_1.expect)(logger_1.logger.info).toHaveBeenCalledWith(`Retreived all users: ${users.length} found`);
    }));
    (0, vitest_1.it)('should fail to getAllUsers and log an error', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.vi.spyOn(userModel_1.User, 'find').mockRejectedValueOnce(new Error('Find error'));
        yield (0, vitest_1.expect)((0, userService_1.getAllUsers)()).rejects.toThrow('Find error');
        (0, vitest_1.expect)(logger_1.logger.error).toHaveBeenCalledWith('Failed to retreive all users: Find error');
    }));
    (0, vitest_1.it)('should updated a user succesfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUserInput1 = {
            name: "someUser",
            email: "someEmail@email.com",
            password: "somePassword",
            role: 'user'
        };
        const addedUser = yield (0, userService_1.addUser)(mockUserInput1);
        // @ts-ignore
        const addeddUserWithId = addedUser;
        const updateData = { email: 'emailSome' };
        // @ts-ignore
        const updatedUser = yield (0, userService_1.updateUser)(addeddUserWithId._id.toString(), updateData);
        const updatedUserWithId = updatedUser;
        (0, vitest_1.expect)(updatedUserWithId.email).toBe("emailSome");
        (0, vitest_1.expect)(updatedUserWithId.name).toBe(mockUserInput1.name);
    }));
    (0, vitest_1.it)('should log an error and throw if updateUser is called with invalid ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidId = 'invalidId123';
        const updateData = { email: 'newEmail' };
        yield (0, vitest_1.expect)((0, userService_1.updateUser)(invalidId, updateData)).rejects.toThrow('Invalid user ID!');
        (0, vitest_1.expect)(logger_1.logger.error).toHaveBeenCalledWith('Failed to update new user with id invalidId123: Invalid user ID!');
    }));
    (0, vitest_1.it)('should return null when updating a non-existent user', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistentId = '123456789012345678901234';
        const result = yield (0, userService_1.updateUser)(nonExistentId, { email: 'someEmail' });
        (0, vitest_1.expect)(result).toBeNull();
    }));
    (0, vitest_1.it)('should delete a user succesfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUserInput1 = {
            name: "someUser",
            email: "someEmail@email.com",
            password: "somePassword",
            role: 'user'
        };
        const addedUser = yield (0, userService_1.addUser)(mockUserInput1);
        const addedUserWithId = addedUser;
        // @ts-ignore
        const result = yield (0, userService_1.deleteUser)(addedUserWithId._id.toString());
        (0, vitest_1.expect)(result).toBe(true);
        // @ts-ignore
        const checkDeletedUser = yield (0, userService_1.getUserById)(addedUserWithId._id.toString());
        (0, vitest_1.expect)(checkDeletedUser).toBeNull();
    }));
    (0, vitest_1.it)('should log an error and throw if deleteUser is called with invalid ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidId = 'invalidId123';
        yield (0, vitest_1.expect)((0, userService_1.deleteUser)(invalidId)).rejects.toThrow('Invalid user ID!');
        (0, vitest_1.expect)(logger_1.logger.error).toHaveBeenCalledWith('Failed to delete user with id invalidId123: Invalid user ID!');
    }));
    (0, vitest_1.it)('should return false wwhen deleting a non-existent product', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistentId = '123456789012345678901234';
        const result = yield (0, userService_1.deleteUser)(nonExistentId);
        (0, vitest_1.expect)(result).toBe(false);
    }));
});

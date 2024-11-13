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
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = require("../../src/models/userModel");
const mongodb_memory_server_1 = require("mongodb-memory-server");
let mongoServer;
(0, vitest_1.describe)('User model test suite', () => {
    (0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        // start MongoDB Memory Server 
        mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        // connect to MongoDB Memory Server 
        yield mongoose_1.default.connect(mongoUri);
    }));
    (0, vitest_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        // Stop MongoDB Memory Server 
        yield mongoServer.stop();
        // Disconnect from MongoDB 
        yield mongoose_1.default.disconnect();
    }));
    (0, vitest_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        // clear the connection before each test 
        yield userModel_1.User.deleteMany({});
    }));
    (0, vitest_1.it)('should create and save a user succesfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            name: 'someName',
            email: 'someEmail@mail.com',
            password: 'somePassword',
        };
        const user = new userModel_1.User(userData);
        const savedUser = yield user.save();
        (0, vitest_1.expect)(savedUser._id).toBeDefined();
        (0, vitest_1.expect)(savedUser.name).toBe(userData.name);
        (0, vitest_1.expect)(savedUser.email).toBe(userData.email);
        (0, vitest_1.expect)(savedUser.role).toBe('user');
    }));
});

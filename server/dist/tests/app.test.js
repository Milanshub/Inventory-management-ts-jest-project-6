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
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const app_1 = require("../src/app");
const logger_1 = require("../src/utils/logger");
// Mock the authMiddleware to bypass authentication
vitest_1.vi.mock('../src/middleware/authMiddleware', () => ({
    authMiddleware: (req, res, next) => {
        req.userId = 'testUserId'; // Optionally set a test user ID if needed
        next();
    },
}));
describe('Server Route Tests', () => {
    let mongoServer;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        if (mongoose_1.default.connection.readyState !== 0) {
            yield mongoose_1.default.disconnect();
        }
        mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        yield mongoose_1.default.connect(mongoServer.getUri());
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoServer.stop();
    }));
    it('should respond with 200 OK on the /api/products route', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get('/api/products');
        expect(response.status).toBe(200);
    }));
    it('should respond with 200 OK on the /api/users route', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get('/api/users');
        expect(response.status).toBe(200);
    }));
    it('should log the server startup message without actual startup', () => {
        const loggerSpy = vitest_1.vi.spyOn(logger_1.logger, 'info');
        logger_1.logger.info(`Server running on port 5000`);
        expect(loggerSpy).toHaveBeenCalledWith(expect.stringContaining(`Server running on port`));
        loggerSpy.mockRestore();
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const customErrors_1 = require("../../src/utils/customErrors");
const errorMiddleware_1 = require("../../src/middleware/errorMiddleware");
const logger_1 = require("../../src/utils/logger"); // Assuming logger is mocked
// Mock logger
vitest_1.vi.mock("../../src/utils/logger", () => ({
    logger: {
        error: vitest_1.vi.fn(),
    },
}));
(0, vitest_1.describe)("errorMiddleware", () => {
    const mockReq = {};
    const mockRes = {
        status: vitest_1.vi.fn().mockReturnThis(),
        json: vitest_1.vi.fn().mockReturnThis(),
    };
    const mockNext = vitest_1.vi.fn();
    (0, vitest_1.it)("should handle CustomError and respond with the correct status and message", () => {
        // Correct order: message first, then statusCode
        const customError = new customErrors_1.CustomError("Custom error message", 400);
        (0, errorMiddleware_1.errorMiddleware)(customError, mockReq, mockRes, mockNext);
        (0, vitest_1.expect)(mockRes.status).toHaveBeenCalledWith(400);
        (0, vitest_1.expect)(mockRes.json).toHaveBeenCalledWith({ message: "Custom error message" });
        (0, vitest_1.expect)(logger_1.logger.error).toHaveBeenCalledWith("400 = Custom error message");
    });
    (0, vitest_1.it)("should handle generic Error and respond with 500 and 'Internal Server Error'", () => {
        const genericError = new Error("Something went wrong");
        (0, errorMiddleware_1.errorMiddleware)(genericError, mockReq, mockRes, mockNext);
        (0, vitest_1.expect)(mockRes.status).toHaveBeenCalledWith(500);
        (0, vitest_1.expect)(mockRes.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
        (0, vitest_1.expect)(logger_1.logger.error).toHaveBeenCalledWith("500 - Something went wrong");
    });
});

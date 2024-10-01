import { describe, it, expect, vi } from 'vitest';
import { Response, Request, NextFunction } from 'express';
import { CustomError } from '../../src/utils/customErrors';
import { errorMiddleware } from '../../src/middleware/errorMiddleware';
import { logger } from '../../src/utils/logger'; // Assuming logger is mocked


// Mock logger
vi.mock("../../src/utils/logger", () => ({
    logger: {
        error: vi.fn(),
    },
}));

describe("errorMiddleware", () => {
    const mockReq = {} as Request;
    const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
    } as unknown as Response;
    const mockNext: NextFunction = vi.fn();

    it("should handle CustomError and respond with the correct status and message", () => {
        // Correct order: message first, then statusCode
        const customError = new CustomError("Custom error message", 400);

        errorMiddleware(customError, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Custom error message" });
        expect(logger.error).toHaveBeenCalledWith("400 = Custom error message");
    });

    it("should handle generic Error and respond with 500 and 'Internal Server Error'", () => {
        const genericError = new Error("Something went wrong");

        errorMiddleware(genericError, mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
        expect(logger.error).toHaveBeenCalledWith("500 - Something went wrong");
    });
});
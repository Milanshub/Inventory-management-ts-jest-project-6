"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const customErrors_1 = require("../../src/utils/customErrors");
(0, vitest_1.describe)('CustomErro classes', () => {
    (0, vitest_1.it)('should create a BadRequestError with correct message and StatusCode', () => {
        const error = new customErrors_1.BadRequestError('Bad Request');
        (0, vitest_1.expect)(error).toBeInstanceOf(customErrors_1.CustomError);
        (0, vitest_1.expect)(error.statusCode).toBe(400);
        (0, vitest_1.expect)(error.message).toBe('Bad Request');
    });
    (0, vitest_1.it)('should create UnauthorizedError with default message and correct StatusCode', () => {
        const error = new customErrors_1.UnauthorizedError();
        (0, vitest_1.expect)(error).toBeInstanceOf(customErrors_1.CustomError);
        (0, vitest_1.expect)(error.statusCode).toBe(401);
        (0, vitest_1.expect)(error.message).toBe('Unauthorized');
    });
    (0, vitest_1.it)('should create NotFoundError with correct mesage and StatusCode', () => {
        const error = new customErrors_1.NotFoundError('Resource not found');
        (0, vitest_1.expect)(error).toBeInstanceOf(customErrors_1.CustomError);
        (0, vitest_1.expect)(error.statusCode).toBe(404);
        (0, vitest_1.expect)(error.message).toBe('Resource not found');
    });
    (0, vitest_1.it)('should create InternalServerError with default message and StatusCode', () => {
        const error = new customErrors_1.InternalServerError();
        (0, vitest_1.expect)(error).toBeInstanceOf(customErrors_1.CustomError);
        (0, vitest_1.expect)(error.statusCode).toBe(500);
        (0, vitest_1.expect)(error.message).toBe('Internal Server Error');
    });
    (0, vitest_1.it)('should create InternalServerError with custom message', () => {
        const error = new customErrors_1.InternalServerError('Something went wrong');
        (0, vitest_1.expect)(error).toBeInstanceOf(customErrors_1.CustomError);
        (0, vitest_1.expect)(error.statusCode).toBe(500);
        (0, vitest_1.expect)(error.message).toBe('Something went wrong');
    });
});

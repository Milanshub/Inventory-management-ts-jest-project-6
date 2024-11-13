"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const customErrors_1 = require("../utils/customErrors");
const logger_1 = require("../utils/logger");
const errorMiddleware = (error, req, res, next) => {
    if (error instanceof customErrors_1.CustomError) {
        logger_1.logger.error(`${error.statusCode} = ${error.message}`);
        return res.status(error.statusCode).json({ message: error.message });
    }
    logger_1.logger.error(`500 - ${error.message}`);
    return res.status(500).json({ message: 'Internal Server Error' });
};
exports.errorMiddleware = errorMiddleware;

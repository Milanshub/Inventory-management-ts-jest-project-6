"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProduction = exports.serverConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//configuration settings related to the server environment
exports.serverConfig = {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    mongoUri: process.env.MONGODB_URI,
    corsOrigin: process.env.CORS_ORIGIN
};
// set env NODE_ENV to production when running in production
exports.isProduction = exports.serverConfig.env === 'production';

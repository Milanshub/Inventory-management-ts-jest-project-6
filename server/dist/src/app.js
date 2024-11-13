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
exports.startServer = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors")); // Import CORS middleware
const productRouters_1 = __importDefault(require("./routes/productRouters"));
const userRouters_1 = __importDefault(require("./routes/userRouters"));
const logger_1 = require("./utils/logger");
const serverConfig_1 = require("./config/serverConfig");
const dbConfig_1 = require("./config/dbConfig");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // If credentials (cookies) are needed
};
// Apply CORS middleware to the app
app.use((0, cors_1.default)(corsOptions));
// Middleware to parse JSON request bodies
app.use(express_1.default.json());
// Routes
app.use('/api', productRouters_1.default);
app.use('/api', userRouters_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (mongoose_1.default.connection.readyState === 0) {
            yield (0, dbConfig_1.connectToMongoDb)();
        }
        app.listen(serverConfig_1.serverConfig.port, () => {
            logger_1.logger.info(`Server running on port ${serverConfig_1.serverConfig.port} in ${serverConfig_1.serverConfig.env} mode`);
        });
    }
    catch (error) {
        logger_1.logger.error(`Error starting server: ${error.message}`);
        process.exit(1);
    }
});
exports.startServer = startServer;
startServer();

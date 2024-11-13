"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const serverConfig_1 = require("../../src/config/serverConfig");
// Mock process.env
vitest_1.vi.mock('dotenv', () => ({
    default: {
        config: vitest_1.vi.fn(() => {
            process.env.MONGODB_URI = 'mongodb://fake-mongo-uri';
            process.env.NODE_ENV = 'production';
            process.env.JWT_SECRET = 'fake-token';
            process.env.PORT = '3000';
            process.env.CORS_ORIGIN = 'http://localhost:3000';
        }),
    },
}));
(0, vitest_1.describe)('Server config test suite', () => {
    (0, vitest_1.it)("should load correct configuration values from enviroment variables", () => {
        const config = serverConfig_1.serverConfig;
        (0, vitest_1.expect)(config.mongoUri).toBe('mongodb://fake-mongo-uri');
        (0, vitest_1.expect)(config.env).toBe('production');
        (0, vitest_1.expect)(config.jwtSecret).toBe('fake-token');
        (0, vitest_1.expect)(config.port).toBe('3000');
        (0, vitest_1.expect)(config.corsOrigin).toBe('http://localhost:3000');
    });
});

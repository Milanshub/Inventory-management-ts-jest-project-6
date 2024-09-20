import { describe, it, expect, vi } from "vitest";
import { serverConfig } from "../../src/config/serverConfig";

// Mock process.env
vi.mock('dotenv', () => ({
    default: {
        config: vi.fn(() => {
            process.env.MONGODB_URI = 'mongodb://fake-mongo-uri'; 
            process.env.NODE_ENV = 'production';
            process.env.JWT_SECRET = 'fake-token'
            process.env.PORT = '3000'
            process.env.CORS_ORIGIN = 'http://localhost:3000' 
        }),
    },
}));

describe('Server config test suite', () => {
    it("should load correct configuration values from enviroment variables", () => {
        const config = serverConfig; 

        expect(config.mongoUri).toBe('mongodb://fake-mongo-uri');
        expect(config.env).toBe('production');
        expect(config.jwtSecret).toBe('fake-token');
        expect(config.port).toBe('3000');
        expect(config.corsOrigin).toBe('http://localhost:3000');
    });

})
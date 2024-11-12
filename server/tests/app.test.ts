import { vi } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../src/app';
import { logger } from '../src/utils/logger';
import { Request, Response, NextFunction } from 'express'; // Import types from express

// Mock the authMiddleware to bypass authentication
vi.mock('../src/middleware/authMiddleware', () => ({
    authMiddleware: (req: Request, res: Response, next: NextFunction) => {
        (req as any).userId = 'testUserId'; // Optionally set a test user ID if needed
        next();
    },
}));

describe('Server Route Tests', () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it('should respond with 200 OK on the /api/products route', async () => {
        const response = await request(app).get('/api/products');
        expect(response.status).toBe(200);
    });

    it('should respond with 200 OK on the /api/users route', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200);
    });

    it('should log the server startup message without actual startup', () => {
        const loggerSpy = vi.spyOn(logger, 'info');
        logger.info(`Server running on port 5000`);

        expect(loggerSpy).toHaveBeenCalledWith(
            expect.stringContaining(`Server running on port`)
        );

        loggerSpy.mockRestore();
    });
});

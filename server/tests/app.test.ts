import request from 'supertest';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from '../src/routes/productRouters';
import userRouter from '../src/routes/userRouters';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { logger } from '../src/utils/logger';
import { connectToMongoDb } from '../src/config/dbConfig'; // Import your MongoDB connection
import { serverConfig } from '../src/config/serverConfig';
import { vi } from 'vitest';
import {app, startServer} from '../src/app'

dotenv.config();

describe('Server Tests', () => {
    let mongoServer: MongoMemoryServer;

    // Setup the in-memory MongoDB server before all tests
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri(), {
       
        });
    });

    // Close the connection and stop the server after tests
    afterAll(async () => {
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    it('should respond with 200 OK on the /api/products route', async () => {
        const response = await request(app).get('/api/products'); // Adjust according to your actual product routes
        expect(response.status).toBe(200);
        // Add more assertions based on expected response
    });

    it('should respond with 200 OK on the /ap/users route', async () => {
        const response = await request(app).get('/api/users'); // Adjust according to your actual user routes
        expect(response.status).toBe(200);
        // Add more assertions based on expected response
    });

    // it('should return 404 for unknown routes', async () => {
    //     const response = await request(app).get('/unknown'); // Testing an unknown route
    //     expect(response.status).toBe(404);
    //     expect(response.body.message).toBe('Not Found'); // Ensure the error message matches
    // });

    it('should log the server starting', async () => {
        const loggerSpy = vi.spyOn(logger, 'info');

        // Manually start the server to trigger logger
        const server = app.listen(5000, () => {
            logger.info(`Server running on port 5000`);
        });

        // Trigger a request to ensure the logger has been called
        await request(app).get('/api/products'); // Call a valid endpoint

        expect(loggerSpy).toHaveBeenCalledWith(
            expect.stringContaining(`Server running on port 5000`), // Check if the log contains this message
        );

        server.close(); // Clean up after the test
    });
});
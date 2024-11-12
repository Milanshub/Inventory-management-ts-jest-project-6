import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS middleware
import productRouter from './routes/productRouters';
import userRouter from './routes/userRouters';
import { logger } from './utils/logger';
import { serverConfig } from './config/serverConfig';
import { connectToMongoDb } from './config/dbConfig';

dotenv.config();

const app: Application = express();

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // If credentials (cookies) are needed
};

// Apply CORS middleware to the app
app.use(cors(corsOptions));

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use('/api', productRouter);
app.use('/api', userRouter);

const startServer = async () => {
    try {
        if (mongoose.connection.readyState === 0) { 
            await connectToMongoDb();
        }
        app.listen(serverConfig.port, () => {
            logger.info(`Server running on port ${serverConfig.port} in ${serverConfig.env} mode`);
        });
    } catch (error: any) {
        logger.error(`Error starting server: ${error.message}`);
        process.exit(1);
    }
};

startServer();

export { app, startServer };

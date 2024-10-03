import express, { Application } from 'express'; 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routes/productRouters';
import userRouter from './routes/userRouters';
import { logger } from './utils/logger';
import { serverConfig } from './config/serverConfig';
import { connectToMongoDb } from './config/dbConfig';

dotenv.config(); 

const app: Application = express(); 

app.use(express.json());

app.use('/api', productRouter); 

app.use('/api', userRouter); 


const startServer = async () => {
    
    try {
        await connectToMongoDb(); 
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

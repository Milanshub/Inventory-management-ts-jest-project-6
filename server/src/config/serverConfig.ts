import dotenv from 'dotenv'; 

dotenv.config(); 

//configuration settings related to the server environment
export const serverConfig = {
    port: process.env.PORT,
    env: process.env.NODE_ENV, 
    jwtSecret: process.env.JWT_SECRET,
    mongoUri: process.env.MONGODB_URI, 
    corsOrigin: process.env.CORS_ORIGIN
}; 

// set env NODE_ENV to production when running in production
export const isProduction = serverConfig.env === 'production'; 
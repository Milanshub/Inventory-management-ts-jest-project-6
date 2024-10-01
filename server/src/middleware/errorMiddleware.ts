import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customErrors";
import { logger } from "../utils/logger";

export const errorMiddleware = (
    error: CustomError | Error,
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    if (error instanceof CustomError){
        logger.error(`${error.statusCode} = ${error.message}`); 
        return res.status(error.statusCode).json({ message: error.message}); 
    }

    logger.error(`500 - ${error.message}`); 
    return res.status(500).json({ message: 'Internal Server Error'}); 
}; 